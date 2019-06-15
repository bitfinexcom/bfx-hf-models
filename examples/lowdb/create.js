'use strict'

process.env.DEBUG = '*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const { LOWDB_FILENAME } = process.env

const debug = require('debug')('bfx:hf:models:examples:lowdb:create')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const HFDB = require('../../')

const db = new HFDB({
  adapter: HFDBLowDBAdapter({ dbPath: LOWDB_FILENAME }),
  schema: HFDBBitfinexSchema,
})

const { Candle } = db

const exec = async () => {
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
}

try {
  exec()
} catch (e) {
  debug('error: %s', e.stack)
}
