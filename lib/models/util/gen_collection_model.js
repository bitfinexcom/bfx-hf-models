const _isFunction = require('lodash/isFunction')

const MODEL_TYPES = require('../../model_types')
const SORT_TYPES = require('../../sort_types')

const genModelMethodForMeta = require('./gen_model_method_for_meta')
const insertMethodGen = require('../method_generators/insert')
const getAllMethodGen = require('../method_generators/get_all')
const rmAllMethodGen = require('../method_generators/rm_all')

// TODO: WIP
module.exports = (db, {
  name, path, schema, key, sort, extraMethods,
} = {}) => {
  const genModelFunc = genModelMethodForMeta({
    name, path, key, db, sort,
  })
  // const get = getMethodGen(genModelFunc) // getter is used by other funcs

  const model = {
    _type: MODEL_TYPES.COLLECTION,
    _schema: schema,
    _name: name,
    _path: path,
    _sort: sort,

    // get: (doc) => {},
    getAll: getAllMethodGen(genModelFunc),
    // getByIndex: (i) => {},

    insert: insertMethodGen(genModelFunc),
    // update: (doc) => {},
    // updateByIndex: (doc, i) => {},

    // rm: (doc) => {},
    rmAll: rmAllMethodGen(genModelFunc),
    // rmByIndex: (i) => {},
  }

  return {
    ...model,
    ...(!_isFunction(extraMethods)
      ? {}
      : (extraMethods(model, db) || {})
    ),
  }
}
