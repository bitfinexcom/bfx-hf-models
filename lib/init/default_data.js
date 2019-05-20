const _values = require('lodash/values')

const MODEL_TYPES = require('../model_types')
const DB_VERSION = require('./version')
const models = require('../models')

const COLLECTIONS = []
const MAPS = []
const DB_DEFAULT = { _version: DB_VERSION }

_values(models).forEach((model = {}) => {
  const { TYPE, PATH } = model

  switch (TYPE) {
    case MODEL_TYPES.COLLECTION:
      COLLECTIONS.push(PATH)
      break;
    
    case MODEL_TYPES.MAP:
      MAPS.push(PATH)
      break;

    default:
      throw new Error(`invalid model type: ${TYPE}`)
  }
})


MAPS.forEach(m => DB_DEFAULT[m] = {})
COLLECTIONS.forEach(m => DB_DEFAULT[m] = [])

module.exports = DB_DEFAULT
