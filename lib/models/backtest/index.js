'use strict'

const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
  indicators: Object,
  trades: Array,
  symbol: String,
  tf: String,
  from: Date,
  to: Date,
  bt_id: String,
  strategy_id: String
})

const Backtest = Mongoose.model('Backtest', schema)
module.exports = Backtest
