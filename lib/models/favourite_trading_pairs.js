const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'favourite_trading_pairs',
  name: 'FavouriteTradingPairs',
  type: MODEL_TYPES.MAP,
  schema: {
    pairs: Array,

    exchangeData: Object
  },
  mapKey: () => ('favouriteTradingPairs')
})
