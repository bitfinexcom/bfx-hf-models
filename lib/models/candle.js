'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Candlestick model, similar to {@link module:bfx-api-node-models.Candle} but
 * meant for storage outside of Bitfinex. i.e. for usage in backtests over
 * historical data.
 *
 * @name module:bfx-hf-models/Candle
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
 * @constant
 * @readonly
 */
const Candle = {
  path: 'candles',
  name: 'Candle',
  type: MODEL_TYPES.COLLECTION,
  index: 'key',
  indexMatches: ['key'],
  schema: {
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,

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

module.exports = () => Candle
