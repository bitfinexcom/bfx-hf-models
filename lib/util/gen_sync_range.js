'use strict'

const _last = require('lodash/last')
const _isFunction = require('lodash/isFunction')
const { rangeString } = require('bfx-hf-util')

/**
 * Generates a 'syncRange' method for the specified model, which must implement
 * 'fetchRange' and 'saveRange'
 *
 * Documents must have a 'mts' key
 *
 * @param {string} docName - for logging, i.e. 'trades'
 * @param {number|Method} maxDiscrepancyArg - gap limit between docs not considered missing data
 * @param {Object} modelArgDef - i.e. ['symbol', 'tf']
 * @param {Method} debug - debug method
 * @return {Method} syncRange
 */
module.exports = (docName, maxDiscrepancyArg, modelArgDef = [], debug) => {
  return async function (rest, args = {}) {
    const { forceSync, start, end } = args
    const modelArgs = {}

    // Populate modelArgs, i.e. { symbol: 'tBTCUSD', tf: '1m' }
    modelArgDef.forEach(arg => { modelArgs[arg] = args[arg] })

    // Calc max discrepancy if needed
    const maxDiscrepancy = _isFunction(maxDiscrepancyArg)
      ? maxDiscrepancyArg(modelArgs)
      : maxDiscrepancyArg

    let fetchStart = start
    let fetchEnd = end

    // Query existing timestamps in the range to fill gaps
    const timestampsRes = forceSync
      ? []
      : await this
        .find()
        .where('mts').gte(start).lte(end)
        .select('mts')
        .exec()

    // Fill gaps in trade data
    if (timestampsRes.length > 0) {
      const timestamps = timestampsRes.map(doc => +doc.mts)
      timestamps.sort((a, b) => a - b)

      for (let i = -1; i < timestamps.length; i += 1) {
        const t1 = i === -1 ? fetchStart : timestamps[i]
        const t2 = i === timestamps.length - 1 ? fetchEnd : timestamps[i + 1]

        if (t2 - t1 > maxDiscrepancy) {
          debug('detected gap in %s: %s', docName, rangeString(t1, t2))

          await this.syncRange(rest, {
            forceSync: true,
            start: t1 + 1,
            end: t2 - 1,
            ...modelArgs
          })
        }
      }

    // Else sync all trades
    } else {
      let lastMTS = fetchStart
      let prevLastElement = null

      while (lastMTS + maxDiscrepancy < fetchEnd) {
        debug('fetching remote %s %s', docName, rangeString(lastMTS, fetchEnd))

        let attemptsLeft = 3
        let items = []

        while (attemptsLeft > 0 && items.length === 0) {
          attemptsLeft -= 1

          try {
            items = await this.fetchRange(rest, {
              start: lastMTS,
              end: fetchEnd,
              ...modelArgs
            })
          } catch (e) { // may fail due to timeout
            if (attemptsLeft === 0) {
              throw e // throw again if no more attempts are left
            }
          }
        }

        if (items.length === 0) {
          break
        }

        await this.saveRange({
          ...modelArgs,
          prevLastElement
        }, items)

        lastMTS = _last(items).mts + 1
        prevLastElement = _last(items)
      }
    }
  }
}
