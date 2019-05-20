const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _includes = require('lodash/includes')
const _keys = require('lodash/keys')
const _values = require('lodash/values')

const TYPES = require('../field_types')

const MIN_PATH_LENGTH = 4 // sanity

module.exports = (name, model = {}) => {
  const { SCHEMA, PATH } = model

  if (!_isString(PATH) || _isEmpty(PATH)) {
    throw new Error(`[${name}] invalid schema path: ${PATH}`)
  }

  if (PATH.length < MIN_PATH_LENGTH) {
    throw new Error(`[${name}] path length < min [${MIN_PATH_LENGTH}]: ${PATH}`)
  }

  if (!_isObject(SCHEMA)) {
    throw new Error(`[${name}] schema must be an object (${typeof SCHEMA})`)
  }

  _keys(SCHEMA).forEach(key => {
    const validator = SCHEMA[key]

    if (!_includes(_values(TYPES), validator)) {
      throw new Error(`unrecognised validator for ${key}: ${typeof validator}`)
    }
  })
}
