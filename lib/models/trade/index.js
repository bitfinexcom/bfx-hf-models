'use strict'

const Mongoose = require('mongoose')
const syncRange = require('./sync_range')
const fetchRange = require('./fetch_range')
const saveRange = require('./save_range')
const queryRange = require('./query_range')

const schema = new Mongoose.Schema({
  bfx_id: { type: Number, unique: true },
  price: Number,
  amount: Number,
  mts: Number,
  symbol: String
})

schema.statics.syncRange = syncRange
schema.statics.fetchRange = fetchRange
schema.statics.saveRange = saveRange
schema.statics.queryRange = queryRange

const Trade = Mongoose.model('Trade', schema)
module.exports = Trade
