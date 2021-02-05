'use strict'

const path = require('path')

const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const HFDB = require('../')

const { LOWDB_FILENAME = 'test.json' } = process.env

module.exports = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBLowDBAdapter({
    dbPath: path.join(__dirname, '..', 'db', LOWDB_FILENAME),
    schema: HFDBBitfinexSchema
  })
})
