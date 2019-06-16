'use strict'

const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')

const MODEL_TYPES = require('../model_types')
const assignModelMethods = require('./assign_model_methods')

/**
 * Binds all methods provided by the DB adapter onto the specified model,
 * depending on the model type (collection or map)
 *
 * @param {Object} adapter - bfx-hf-models DB adapter instance
 * @param {Object} model - bfx-hf-models DB model definition
 * @return {Object} model
 */
module.exports = (adapter, model) => {
  const { mapMethods, genericMethods, collectionMethods } = adapter
  const { type, name, path } = model

  if (!_isString(name) || _isEmpty(name)) {
    throw new Error('model missing name')
  } else if (!_isString(path) || _isEmpty(path)) {
    throw new Error(`model DB path not string or empty: ${name}`)
  }

  assignModelMethods(adapter, model, genericMethods)

  switch (type) {
    case MODEL_TYPES.COLLECTION:
      assignModelMethods(adapter, model, collectionMethods)
      break

    case MODEL_TYPES.MAP:
      assignModelMethods(adapter, model, mapMethods)
      break

    default:
      throw new Error(`invalid model type: ${type} [${name}]`)
  }

  return model
}
