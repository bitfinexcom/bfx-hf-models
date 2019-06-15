'use strict'

const _includes = require('lodash/includes')
const defaultModels = require('../models')
const defaultModelNames = Object.keys(defaultModels)

/**
 * Assigns default schema definitions to an incoming schema set
 *
 * @param {Object} schema
 * @return {Object} processedSchema
 */
module.exports = (schema) => {
  const modelNames = Object.keys(schema)
  const processed = JSON.parse(JSON.stringify(schema))

  // Assign default schema if models don't provide their own, and populate
  // exchangeData field on schema
  modelNames.forEach(name => {
    if (!_includes(defaultModelNames, name)) {
      return
    }

    const defaultModel = defaultModels[name]

    Object.keys(defaultModel).forEach(key => {
      if (!processed[name][key]) {
        processed[name][key] = defaultModel[key]
      }
    })

    const { schemaExchangeData } = processed[name]

    if (schemaExchangeData) {
      processed[name].schema.exchangeData = schemaExchangeData
      delete processed[name].schemaExchangeData
    }
  })

  return processed
}
