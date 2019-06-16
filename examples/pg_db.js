'use strict'

const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const HFDB = require('../')

const { PSQL_CONNECTION } = process.env

module.exports = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBSQLAdapter({
    connection: PSQL_CONNECTION,
    clientType: 'pg'
  }),
})

