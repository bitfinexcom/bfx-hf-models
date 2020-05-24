'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Public trade model, similar to {@link module:bfx-api-node-models.PublicTrade}
 * but meant for storage outside of Bitfinex. i.e. for usage in backtests over
 * historical data.
 *
 * @name module:bfx-hf-models/Trade
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
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
