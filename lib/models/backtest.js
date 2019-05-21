const MODEL_TYPES = require('../model_types')
const FIELD_TYPES = require('../field_types')
const genModel = require('../util/gen_model')

module.exports = genModel({
  type: MODEL_TYPES.MAP,
  name: 'HF Backtest',
  path: 'backtests',
  schema: {
    indicators: FIELD_TYPES.OBJECT,
    trades: FIELD_TYPES.ARRAY,
    symbol: FIELD_TYPES.STRING,
    tf: FIELD_TYPES.STRING,
    from: FIELD_TYPES.DATE,
    to: FIELD_TYPES.DATE,

    btID: FIELD_TYPES.STRING,
    strategyID: FIELD_TYPES.STRING
  },

  key: ({ btID, strategyID } = {}) => `${btID}-${strategyID}`
})
