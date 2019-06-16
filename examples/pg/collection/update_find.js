'use strict'

process.env.DEBUG = 'bfx:*,knex:query'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:models:examples:pg:collection:update_find')
const db = require('../../pg_db')
const { Candle } = db

try {
  (async () => {
    debug('creating candle...')

    await Candle.insert({
      open: 200,
      high: 150,
      low: 85,
      close: 121,

      tf: '1m',
      symbol: 'tBTCUSD',
      exchange: 'bitfinex',
      vol: 42,

      mts: Date.now(),

      exchangeData: {
        type: 'hist'
      }
    })

    debug('inserted first candle')

    await Candle.insert({
      open: 210,
      high: 150,
      low: 85,
      close: 121,

      tf: '1m',
      symbol: 'tBTCUSD',
      exchange: 'bitfinex',
      vol: 42,

      mts: Date.now(),

      exchangeData: {
        type: 'hist'
      }
    })

    debug('inserted second candle')

    const updatedRows = await Candle.update([['open', '>=', 200]], { open: 300 })
    debug('updated %d rows', updatedRows)

    const updatedCandles = await Candle.find([['open', '=', 300]])
    debug('read updated candles: %j', updatedCandles)

    const cleanupCount = await Candle.rmAll()
    debug('cleaned up %d candles', cleanupCount)

    db.close()
  })()
} catch (e) {
  debug('error: %s', e.stack)
}
