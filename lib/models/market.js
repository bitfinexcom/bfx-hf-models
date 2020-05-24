'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Exchange market metadata, used by
 * {@link module:bfx-hf-server|bfx-hf-server} and
 * {@link module:bfx-hf-ui|bfx-hf-ui} to track available trading markets and
 * their API names.
 *
 * @name module:bfx-hf-models/Market
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
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
