const debug = require('debug')('bfx:hf:models:util:gen-map-model')
const _isFunction = require('lodash/isFunction')
const MODEL_TYPES = require('../model_types')

/**
 * Generates a map model
 *
 * @param {LowDBInstance} db
 * @param {Object} args
 * @param {string} args.name - human readable model name
 * @param {string} args.path - path in lowdb
 * @param {object} args.schema - object, see FIELD_TYPES
 * @param {Function} args.key - key func, passed document
 * @param {Function?} args.extraMethods - passed model, ret val merged onto model methods
 * @return {Object} model
 */
module.exports = (db, {
  name, path, schema, key, extraMethods
} = {}) => {
  const _keyFunc = (doc = {}) => `${path}.${key(doc)}`
  const model = {
    _type: MODEL_TYPES.MAP,
    _schema: schema,
    _name: name,
    _path: path,

    set: (doc = {}) => {
      const k = _keyFunc(doc)

      debug('[%s] set on key %s', name, k)

      return db.set(k, doc).write()
    },

    rm: (doc = {}) => {
      const k = _keyFunc(doc)

      debug('[%s] remove key %s', name, k)

      return db.unset(k).write()
    },

    get: (doc = {}) => {
      const k = _keyFunc(doc)

      debug('[%s] get key %s', name, k)

      return db.get(k).value()
    },

    getAll: () => {
      debug('[%s] get all', name)

      return db.get(path).values().value()
    }
  }

  // alias
  model.create = model.set

  if (_isFunction(extraMethods)) {
    Object.assign(model, (extraMethods(model) || {}))
  }

  return model
}
