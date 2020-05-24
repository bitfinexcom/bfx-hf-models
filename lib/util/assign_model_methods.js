'use strict'

const _keys = require('lodash/keys')
const _isFunction = require('lodash/isFunction')

/**
 * Binds the provided methods on the model with a standarised signature of
 * (db, model, ...args)
 *
 * @memberof module:bfx-hf-models
 * @private
 *
 * @param {module:bfx-hf-models.DBAdapter} adapter - adapter
 * @param {object} model - model to initialize
 * @param {object} methods - map of methods by name to bind onto model
 * @returns {object} initializedModel - ready for attaching to the database
 *   instance & usage
 */
const assignModelMethods = (adapter, model, methods) => {
  _keys(methods).forEach(methodName => {
    model[methodName] = async (...args) => {
      const db = _isFunction(adapter.dbInit) // allow for init w/ model params
        ? adapter.dbInit(model)
        : adapter.db

      return methods[methodName](db, model, ...args)
    }
  })

  return model
}

module.exports = assignModelMethods
