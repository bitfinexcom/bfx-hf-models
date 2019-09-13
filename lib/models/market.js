const MODEL_TYPES = require('../model_types')

module.exports = {
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
