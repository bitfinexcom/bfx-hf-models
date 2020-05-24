'use strict'

const _keys = require('lodash/keys')
const _includes = require('lodash/includes')
const _isObject = require('lodash/isObject')

const MODEL_TYPES = require('../model_types')
const defaultModels = require('../models')
const defaultModelNames = Object.keys(defaultModels)

/**
 * Assigns default schema definitions to an incoming schema set.
 *
 * @memberof module:bfx-hf-models
 * @private
 *
 * @param {object} schema - schema
 * @returns {object} processedSchema
 */
const processSchema = (schema) => {
  const modelNames = _keys(schema)
  const processed = JSON.parse(JSON.stringify(schema))

  modelNames.forEach(name => {
    // Restore methods lost after json deep copy
    if (_isObject(schema[name].methods)) {
      processed[name].methods = schema[name].methods
    }

    if (!_includes(defaultModelNames, name)) {
      return
    }

    const defaultModel = defaultModels[name]()

    // Assign default schema if models don't provide their own
    _keys(defaultModel).forEach(key => {
      if (!processed[name][key]) {
        processed[name][key] = defaultModel[key]
      }
    })

    // Populate exchangeData
    const { schemaExchangeData } = processed[name]

    if (schemaExchangeData) {
      processed[name].schema.exchangeData = schemaExchangeData
      delete processed[name].schemaExchangeData
    }
  })

  // Include builtin models if not present on schema
  defaultModelNames.forEach(defaultModelName => {
    if (!_includes(modelNames, defaultModelName)) {
      processed[defaultModelName] = defaultModels[defaultModelName]()
    }
  })

  // Include mapKey on map model schemas
  _keys(processed).forEach(modelName => {
    const model = processed[modelName]

    if (model.type === MODEL_TYPES.MAP) {
      model.schema.mapKey = String
    }
  })

  return processed
}

module.exports = processSchema
