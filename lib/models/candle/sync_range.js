const DEBUG_STR = 'bfx:hf:models:candle:sync-range' // for pretty formatting

const debug = require('debug')(DEBUG_STR)
const PI = require('p-iteration')
const Promise = require('bluebird')
const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')
const { TIME_FRAME_WIDTHS, preprocessRemoteCandles } = require('bfx-hf-util')

const FETCH_LIMIT = 1000
const rest = new RESTv2({ transform: true })
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0, // taken from docs
  promiseImplementation: Promise
})

// NOTE: returns promise
module.exports = ({ getInRange, auditGaps, insert, write }) => (
    ({ type, symbol, tf } = {}, { start, end }) => {
    const existingCandles = getInRange({ type, symbol, tf }, { start, end })
    const boundsToSync = []

    // sync entire range
    if (existingCandles.length === 0) {
      boundsToSync.push({ start, end })
    } else if (existingCandles.length >= 2 && (
      existingCandles[0].mts === end && _last(existingCandles).mts === start
    )) {
      return Promise.resolve() // all candles present
    } else { // sync to fill gaps
      const gapData = auditGaps({ type, symbol, tf }, { start, end })
      const { gaps } = gapData

      // fill in gaps
      const width = TIME_FRAME_WIDTHS[tf]

      gaps.forEach(gapIndex => (
        boundsToSync.push({ // note candles are descending by mts
          // add half/take-away half of the candle width to make sure we don't
          // download the start/end candle that we already have locally

          // also to download a single candle you can't have the same start/end
          // time; otherwise we get a 400 error
          start: gapData.candles[gapIndex + 1].mts + (width / 2),
          end: gapData.candles[gapIndex].mts - (width / 2),
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
        const consistent = preprocessRemoteCandles(tf, candles, true)

        consistent.forEach(c => {
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

      write()
    })
  }
)
