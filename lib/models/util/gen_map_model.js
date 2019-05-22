const _isFunction = require('lodash/isFunction')

const MODEL_TYPES = require('../../model_types')
const genModelMethodForMeta = require('./gen_model_method_for_meta')
const getMethodGen = require('../method_generators/get')
const getAllMethodGen = require('../method_generators/get_all')
const setMethodGen = require('../method_generators/set')
const createMethodGen = require('../method_generators/create')
const updateMethodGen = require('../method_generators/update')
const rmMethodGen = require('../method_generators/rm')

/**
 * Generates a map model (operates on keys)
 *
 * @param {LowDBInstance} db
 * @param {Object} args
 * @param {string} args.name - human readable model name
 * @param {string} args.path - path in lowdb
 * @param {object} args.schema - object, see FIELD_TYPES
 * @param {Function} args.key - key func, passed document
 * @param {Function?} args.extraMethods - passed model, merged onto model methods
 * @return {Object} model
 */
module.exports = (db, {
  name, path, schema, key, extraMethods
} = {}) => {
  const genModelFunc = genModelMethodForMeta({ name, path, key, db })
  const get = getMethodGen(genModelFunc) // getter is used by other funcs

  const model = {
    _type: MODEL_TYPES.MAP,
    _schema: schema,
    _name: name,
    _path: path,

    set: setMethodGen(genModelFunc, get),
    rm: rmMethodGen(genModelFunc, get),
    get: getMethodGen(genModelFunc),
    getAll: getAllMethodGen(genModelFunc),
    update: updateMethodGen(genModelFunc, get),
    create: createMethodGen(genModelFunc, get),
  }

  return {
    ...model,
    ...(!_isFunction(extraMethods)
      ? {}
      : (extraMethods(model) || {})
    ),
  }
}
