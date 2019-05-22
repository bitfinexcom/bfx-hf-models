const _isString = require('lodash/isString')
const _isObject = require('lodash/isObject')
const _isEmpty = require('lodash/isEmpty')
const _includes = require('lodash/includes')
const _keys = require('lodash/keys')

const genCollectionModel = require('./gen_collection_model')
const genMapModel = require('./gen_map_model')
const MODEL_TYPES = require('../../model_types')
const SORT_TYPES = require('../../sort_types')

// TODO: Export
const validModelStringKey = v => _isString(v) && !_isEmpty(v)
const validModelSchema = v => _isObject(v) && !_isEmpty(v)
const validModelSort = v => (
  _isObject(v) && (v.key && _includes(_keys(SORT_TYPES), v.dir))
)

module.exports = (args = {}) => {
  const {
    name, path, type, schema, sort // NOTE: sort optional
  } = args

  if (!validModelStringKey(name)) {
    throw new Error('model name required')
  } else if (!validModelStringKey(path)) {
    throw new Error('model path required')
  } else if (!validModelStringKey(type)) {
    throw new Error('model type required')
  } else if (!validModelSchema(schema)) {
    throw new Error('non-empty model schema required')
  } else if (sort && !validModelSort(sort)) {
    throw new Error('invalid model sort definition')
  }

  const generator = (db) => {
    switch (type) {
      case MODEL_TYPES.COLLECTION:
        return genCollectionModel(db, args)

      case MODEL_TYPES.MAP:
        return genMapModel(db, args)

      default:
        throw new Error(`unknown model type: ${type}`)
    }
  }

  generator._name = name
  generator._type = type
  generator._path = path
  generator._schema = schema

  if (sort) {
    generator._sort = sort
  }

  return generator
}
