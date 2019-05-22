const MODEL_TYPES = require('../model_types')
const FIELD_TYPES = require('../field_types')
const SORT_TYPES = require('../sort_types')
const genModel = require('./util/gen_model')

module.exports = genModel({
  name: 'Candle',
  path: 'candles',
  type: MODEL_TYPES.COLLECTION,
  sort: {
    dir: SORT_TYPES.DESC,
    key: 'mts',
  },

  schema: {
    open: FIELD_TYPES.NUMBER,
    high: FIELD_TYPES.NUMBER,
    low: FIELD_TYPES.NUMBER,
    close: FIELD_TYPES.NUMBER,
    vol: FIELD_TYPES.NUMBER,

    symbol: FIELD_TYPES.STRING,
    tf: FIELD_TYPES.STRING,
    type: FIELD_TYPES.STRING,

    mts: FIELD_TYPES.NUMBER
  },

  key: ({ symbol, tf, type } = {}) => `${symbol}-${tf}-${type}`,
  extraMethods: ({ get }) => ({
    syncRange: ({ symbol, tf, start, end } = {}) => {
      // TODO:
    }
  })
})
