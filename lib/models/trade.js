const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'trades',
  name: 'Trade',
  type: MODEL_TYPES.COLLECTION,
  schema: {
    price: Number,
    amount: Number,
    mts: Number,
    exchange: String,
    symbol: String,

    exchangeData: Object
  },

  requiredMethods: [
    'syncRange'
  ]
})
