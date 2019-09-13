const MODEL_TYPES = require('../model_types')

module.exports = {
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
