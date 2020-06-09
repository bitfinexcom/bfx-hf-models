'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Public trade model
 *
 * @type {Model}
 * @constant
 * @readonly
 */
const Trade = {
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
}

module.exports = () => Trade
