'use strict'

process.env.DEBUG = '*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const { PSQL_CONNECTION } = process.env

const debug = require('debug')('bfx:hf:models:examples:lowdb:create')
const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const HFDB = require('../../')

const db = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBSQLAdapter({
    connection: PSQL_CONNECTION,
    clientType: 'pg'
  }),
})

const { AlgoOrder } = db

const exec = async () => {
  debug('creating algo order...')

  const gid = Date.now()
  const algoID = 'test-algo'
  const ao = await AlgoOrder.create({
    gid,
    algoID,
    state: {},
    active: false,
  })

  debug('read ao from DB: %j', ao)

  const aoGetObject = await AlgoOrder.get({ gid, algoID })
  debug('read ao with object key from DB: %j', aoGetObject)

  const aoGetKey = await AlgoOrder.get(`${gid}-${algoID}`)
  debug('read ao with string key from DB: %j', aoGetKey)
}

try {
  exec()
} catch (e) {
  debug('error: %s', e.stack)
}
