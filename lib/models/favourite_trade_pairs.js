const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'favourite_trade_pairs',
  name: 'FavouriteTradePairs',
  type: MODEL_TYPES.MAP,
  schema: {
    pairs: Array,

    exchangeData: Object
  },
  mapKey: () => ('favouriteTradePairs')
})
