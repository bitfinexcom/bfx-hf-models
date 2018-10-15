'use strict'

const Mongoose = require('mongoose')
const syncRange = require('./sync_range')
const fetchRange = require('./fetch_range')
const saveRange = require('./save_range')
const queryRange = require('./query_range')

const schema = new Mongoose.Schema({
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  vol: Number,

  symbol: String,
  tf: String,
  type: String,

  mts: { type: Number, unique: true }
})

schema.statics.syncRange = syncRange
schema.statics.fetchRange = fetchRange
schema.statics.saveRange = saveRange
schema.statics.queryRange = queryRange

const Candle = Mongoose.model('Candle', schema)
module.exports = Candle
