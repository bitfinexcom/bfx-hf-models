const DEBUG_STR = 'bfx:hf:models:candle:sync-range' // for pretty formatting

const debug = require('debug')(DEBUG_STR)
const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')
const PI = require('p-iteration')
const _last = require('lodash/last')
const Promise = require('bluebird')

const FETCH_LIMIT = 1000
const rest = new RESTv2({ transform: true })
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0, // taken from docs
  promiseImplementation: Promise
})

// NOTE: returns promise
module.exports = ({ getInRange, auditGaps, insert }) => (
    ({ type, symbol, tf } = {}, { start, end }) => {
    const existingCandles = getInRange({ type, symbol, tf }, { start, end })
    const boundsToSync = []

    // sync entire range
    if (existingCandles.length === 0) {
      boundsToSync.push({ start, end })
    } else { // sync to fill gaps
      const lastCandle = _last(existingCandles)
      const gapData = auditGaps({ type, symbol, tf }, { start, end })
      const { gaps } = gapData

      // missing after known candles
      if (lastCandle.mts !== end) {
        boundsToSync.push({ start: lastCandle.mts, end })
      }

      // fill in gaps
      gaps.forEach(gapIndex => (
        boundsToSync.push({ // note candles are descending by mts
          start: gapData.candles[gapIndex + 1].mts,
          end: gapData.candles[gapIndex].mts
        })
      ))
    }

    if (boundsToSync.length === 0) {
      return Promise.resolve()
    }

    debug('-- syncing ranges')
    debug(
      boundsToSync
        .map(({ start, end }) => `${start}-${end}`)
        .join('\n')
    )
    debug('--')

    return PI.mapSeries(boundsToSync, async ({ start, end }) => (
      pt.add(
        rest.candles.bind(rest, {
          timeframe: tf,
          symbol,
          query: {
            limit: FETCH_LIMIT,
            sort: 1,
            start,
            end,
          }
        })
      )
    )).then(candleSets => {
      candleSets.forEach(candles => {
        candles.forEach(c => {
          insert({
            open: c.open,
            high: c.high,
            low: c.low,
            close: c.close,
            vol: c.volume,
            mts: c.mts,

            symbol,
            type,
            tf,
          })
        })
      })
    })
  }
)
