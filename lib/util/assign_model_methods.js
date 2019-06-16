const _isFunction = require('lodash/isFunction')

/**
 * Binds the provided methods on the model with a standarised signature of
 * (db, model, ...args)
 *
 * @param {BFXHFDBAdapter} adapter
 * @param {Object} model
 * @param {Object} methods
 * @return {Object} model
 */
module.exports = (adapter, model, methods) => {
  Object.keys(methods).forEach(methodName => {
    model[methodName] = async (...args) => {
      const db = _isFunction(adapter.dbInit) // allow for init w/ model params
        ? adapter.dbInit(model)
        : adapter.db

      return methods[methodName](db, model, ...args)
    }
  })

  return model
}
