const MODEL_TYPES = require('../../model_types')
const FIELD_TYPES = require('../../field_types')
const SORT_TYPES = require('../../sort_types')
const genModel = require('../util/gen_model')

const getInRangeGen = require('./get_in_range')
const syncRangeGen = require('./sync_range')
const auditGapsGen = require('./audit_gaps')

module.exports = genModel({
  name: 'Candle',
  path: 'candles',
  type: MODEL_TYPES.COLLECTION,
  sort: {
    dir: SORT_TYPES.DESC,
    key: 'mts'
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
  extraMethods: (defaultMethods) => {
    const methods = { ...defaultMethods }

    // NOTE: order is important, subsequent methods require prev ones
    methods.getInRange = getInRangeGen(methods)
    methods.auditGaps = auditGapsGen(methods)
    methods.syncRange = syncRangeGen(methods)

    return methods
  }
})
