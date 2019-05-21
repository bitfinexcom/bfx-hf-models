const MODEL_TYPES = require('../model_types')

// TODO:
module.exports = (db, {
  name, path, schema, key, extraMethods
} = {}) => {
  return {
    _type: MODEL_TYPES.COLLECTION,
    _schema: schema,
    _name: name,
    _path: path
  }
}
