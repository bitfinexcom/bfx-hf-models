'use strict'

const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')

const MODEL_TYPES = require('../model_types')
const assignModelMethods = require('./assign_model_methods')

/**
 * Binds all methods provided by the DB adapter onto the specified model,
 * depending on the model type (collection or map)
 *
 * @throws {Error} fails if the model is lacking `name` or `path` values, or is
 *   of an invalid type (see {@link module:bfx-hf-models.MODEL_TYPES}
 *
 * @memberof module:bfx-hf-models
 * @private
 *
 * @param {module:bfx-hf-models.DBAdapter} adapter - adapter
 * @param {module:bfx-hf-models.Model} model - model to be initialized
 * @returns {object} initializedModel
 */
const attachAdapterToModel = (adapter, model) => {
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

module.exports = attachAdapterToModel
