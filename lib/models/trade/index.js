const MODEL_TYPES = require('../../model_types')
const FIELD_TYPES = require('../../field_types')
const genModel = require('../util/gen_model')

const getInRangeGen = require('./get_in_range')
const syncRangeGen = require('./sync_range')

module.exports = genModel({
  name: 'Trade',
  path: 'trades',
  type: MODEL_TYPES.COLLECTION,
  schema: {
    bfxID: FIELD_TYPES.NUMBER,
    price: FIELD_TYPES.NUMBER,
    amount: FIELD_TYPES.NUMBER,
    mts: FIELD_TYPES.NUMBER,
    symbol: FIELD_TYPES.STRING
  },

  key: ({ bfxID, mts, symbol } = {}) => bfxID && mts
    ? `${bfxID}-${mts}`
    : symbol,

  extraMethods: (defaultMethods) => {
    const methods = { ...defaultMethods }

    // NOTE: order is important, subsequent methods require prev ones
    methods.getInRange = getInRangeGen(methods)
    methods.syncRange = syncRangeGen(methods)

    return methods
  }
})
