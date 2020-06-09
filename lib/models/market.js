'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Exchange market metadata, used by
 * {@link external:bfx-hf-server} and {@link external:bfx-hf-ui} to track
 * available trading markets and their API names.
 *
 * @type {Model}
 * @constant
 * @readonly
 */
const Market = {
  path: 'markets',
  name: 'Market',
  type: MODEL_TYPES.COLLECTION,
  schema: {
    exchange: String,
    quote: String,
    base: String,
    wsID: String,
    restID: String,
    uiID: String,

    exchangeData: Object
  }
}

module.exports = () => Market
