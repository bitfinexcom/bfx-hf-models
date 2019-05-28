const { TIME_FRAME_WIDTHS } = require('bfx-hf-util')
const _isFinite = require('lodash/isFinite')

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
  extraMethods: ({ getAll }, db) => ({

    auditGaps: ({ tf } = {}, { start, end }) => {
      const gaps = []
      const candles = getAll().filter(c => c.mts >= start && c.mts <= end)

      if (candles.length < 2) {
        return gaps
      }

      const width = TIME_FRAME_WIDTHS[tf]

      if (!_isFinite(width)) {
        throw new Error(`invalid time frame [unknown width]: ${tf}`)
      }

      for (let i = 0; i < candles.length - 1; i += 1) {
        if ((candles[i].mts - candles[i + 1].mts) !== width) {
          gaps.push(i)
        }
      }

      return gaps
    },

    syncRange: ({ type, symbol, tf, start, end } = {}) => {

    }
  })
})
