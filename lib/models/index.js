const _values = require('lodash/values')

const validateModel = require('../validation/model')
const AlgoOrder = require('./algo_order')
const Backtest = require('./backtest')
const Trade = require('./trade')
const Candle = require('./candle')

const MODELS = {
  AlgoOrder,
  Backtest,
  Trade,
  Candle
}

_values(MODELS).forEach(validateModel)

module.exports = MODELS
