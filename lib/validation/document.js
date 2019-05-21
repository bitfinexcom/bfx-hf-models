const debug = require('debug')('bfx:hf:models:validate:document')
const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isEmpty = require('lodash/isEmpty')

module.exports = (document = {}, model = {}) => {
  const { _schema, _name } = model

  if (!_isObject(_schema)) {
    throw new Error(`[${_name}] model missing SCHEMA field`)
  } else if (_isEmpty(_schema)) {
    throw new Error(`[${_name}] model schema empty`)
  }

  return !Object.keys(_schema).find(key => {
    const v = document[key]
    const validator = _schema[key]

    if (!_isFunction(validator)) {
      throw new Error(
        `invalid schema validator for key ${key} [type ${typeof validator}]`
      )
    }

    const valid = validator(v)

    debug(
      '(%s) validated %s [%j] type %s w/ %s [%s]',
      _name, key, typeof v === 'object' ? '{ ... }' : v, typeof v,
      validator.prototype.constructor.name, valid ? 'OK' : 'BAD'
    )

    return !valid
  })
}
