'use strict'

const _isFunction = require('lodash/isFunction')

module.exports = (model) => {
  const { name, requiredMethods = [] } = model

  requiredMethods.forEach(methodName => {
    if (!_isFunction(model[methodName])) {
      throw new Error(`model ${name} missing required method ${methodName}`)
    }
  })
}