'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Strategy backtest results model, includes backtest parameters and all trades
 * performed by the strategy.
 *
 * @name module:bfx-hf-models/Backtest
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
 * @constant
 * @readonly
 */
const Backtest = {
  path: 'backtests',
  name: 'Backtest',
  type: MODEL_TYPES.MAP,
  schema: {
    indicators: Object,
    trades: Array,
    symbol: String,
    tf: String,
    from: Date,
    to: Date,

    btID: String,
    strategyID: String,

    exchangeData: Object
  },

  mapKey: ({ btID, strategyID }) => (`${btID}-${strategyID}`)
}

module.exports = () => Backtest
