'use strict'

process.env.DEBUG = '*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:models:examples:lowdb:insert')
const db = require('../lowdb_db')
const { Candle } = db

try {
  (async () => {
    debug('creating candle...')

    const c = await Candle.insert({
      open: 100,
      high: 150,
      low: 85,
      close: 121,

      tf: '1m',
      symbol: 'tBTCUSD',
      exchange: 'bitfinex',
      vol: 42,

      mts: Date.now(),

      exchangeData: {
        type: 'hist',
      }
    })

    debug('read candle from DB: %j', c)
  })()
} catch (e) {
  debug('error: %s', e.stack)
}
