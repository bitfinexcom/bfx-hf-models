const MODEL_TYPES = require('model_types')
const FIELD_TYPES = require('field_types')
const genModelMethodForMeta = require('models/util/gen_model_method_for_meta')
const db = require('./db')

const genModelFunc = genModelMethodForMeta({
  db,
  name: 'DebugModelMap',
  path: 'debug_model_map',
  type: MODEL_TYPES.MAP,
  schema: {
    id: FIELD_TYPES.STRING,
    str: FIELD_TYPES.STRING
  },

  key: ({ id } = {}) => `${id}`
})

module.exports = genModelFunc
