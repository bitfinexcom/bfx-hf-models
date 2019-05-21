const debug = require('debug')('bfx:hf:models:validate:model')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isFunction = require('lodash/isFunction')
const _includes = require('lodash/includes')
const _keys = require('lodash/keys')
const _values = require('lodash/values')

const TYPES = require('../field_types')

const MIN_PATH_LENGTH = 4 // sanity

module.exports = (model = {}) => {
  const { _name, _schema, _path } = model
  const validPath = _isString(_path) && !_isEmpty(_path)

  debug(
    '(%s) has path (%s) [%s]',
    _name, _path, validPath ? 'OK' : 'BAD'
  )

  if (!validPath) {
    throw new Error(`[${_name}] invalid schema path: ${_path}`)
  }

  const validPathLength = _path.length >= MIN_PATH_LENGTH

  debug(
    '(%s) path length is %d [%s]',
    _name, _path.length, validPathLength ? 'OK' : 'BAD'
  )

  if (!validPathLength) {
    throw new Error(`[${_name}] path length < min [${MIN_PATH_LENGTH}]: ${_path}`)
  }

  const schemaIsObject = _isObject(_schema)

  debug(
    '(%s) schema is object [%s]',
    _name, schemaIsObject ? 'OK' : 'BAD'
  )

  if (!schemaIsObject) {
    throw new Error(`[${_name}] schema must be an object (${typeof _schema})`)
  }

  _keys(_schema).forEach(key => {
    const validator = _schema[key]
    const knownValidator = _includes(_values(TYPES), validator)
    const validatorDebugName = !_isFunction(validator)
      ? 'invalid'
      : validator.prototype
        ? validator.prototype.constructor.name
        : validator.name

    debug(
      '(%s) checking for schema field validator %s (%s) [%s]',
      _name, key, validatorDebugName, knownValidator ? 'OK' : 'BAD'
    )

    if (!knownValidator) {
      throw new Error(`unrecognised validator for ${key}: ${typeof validator}`)
    }
  })
}
