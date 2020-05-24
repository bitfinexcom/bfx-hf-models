'use strict'

const _isFunction = require('lodash/isFunction')

/**
 * Validates a model prior to initialization
 *
 * @throws {Error} if the model is missing a required method
 * @memberof module:bfx-hf-models
 * @private
 *
 * @param {module:bfx-hf-models.Model} model - model
 */
const validateModel = (model) => {
  const { name, requiredMethods = [] } = model

  requiredMethods.forEach(methodName => {
    if (!_isFunction(model[methodName])) {
      throw new Error(`model ${name} missing required method ${methodName}`)
    }
  })
}

module.exports = validateModel
