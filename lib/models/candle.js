const MODEL_TYPES = require('../model_types')

module.exports = {
  path: 'candles',
  type: MODEL_TYPES.COLLECTION,
  schema: {
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    vol: Number,

    exchange: String,
    symbol: String,
    tf: String,
    mts: Number,

    exchangeData: Object
  },

  requiredMethods: [
    'syncRange',
    'auditGaps'
  ]
}
