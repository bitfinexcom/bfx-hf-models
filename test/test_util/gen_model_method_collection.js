const MODEL_TYPES = require('model_types')
const FIELD_TYPES = require('field_types')
const SORT_TYPES = require('sort_types')
const genModelMethodForMeta = require('models/util/gen_model_method_for_meta')
const db = require('./db')

const genModelFunc = genModelMethodForMeta({
  db,
  name: 'DebugModelCollection',
  path: 'debug_model_collection',
  type: MODEL_TYPES.COLLECTION,
  schema: {
    mts: FIELD_TYPES.NUMBER,
    str: FIELD_TYPES.STRING
  },

  sort: {
    dir: SORT_TYPES.DESC,
    key: 'mts'
  },

  key: ({ str } = {}) => str
})

module.exports = genModelFunc
