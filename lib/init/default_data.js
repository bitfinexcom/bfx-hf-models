const _values = require('lodash/values')

const MODEL_TYPES = require('../model_types')
const DB_VERSION = require('./version')
const models = require('../models')

const COLLECTIONS = []
const MAPS = []
const DB_DEFAULT = { _version: DB_VERSION }

_values(models).forEach((model = {}) => {
  const { _type, _path } = model

  switch (_type) {
    case MODEL_TYPES.COLLECTION:
      COLLECTIONS.push(_path)
      break

    case MODEL_TYPES.MAP:
      MAPS.push(_path)
      break

    default:
      throw new Error(`invalid model type: ${_type}`)
  }
})

MAPS.forEach(m => { DB_DEFAULT[m] = {} })
COLLECTIONS.forEach(m => { DB_DEFAULT[m] = [] })

module.exports = DB_DEFAULT
