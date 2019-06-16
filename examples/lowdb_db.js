'use strict'

const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const HFDB = require('../')

const { LOWDB_FILENAME } = process.env

module.exports = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBLowDBAdapter({
    dbPath: `${__dirname}/../${LOWDB_FILENAME}`,
    schema: HFDBBitfinexSchema,
  }),
})
