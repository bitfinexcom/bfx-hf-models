const debug = require('debug')('bfx:hf:models:validate:document')
const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isEmpty = require('lodash/isEmpty')

module.exports = (name, document = {}, model = {}) => {
  const { SCHEMA } = model

  if (!_isObject(SCHEMA)) {
    throw new Error(`[${name}] model missing SCHEMA field`)
  } else if (_isEmpty(SCHEMA)) {
    throw new Error(`[${name}] model schema empty`)
  }

  return !Object.keys(SCHEMA).find(key => {
    const v = document[key]
    const validator = SCHEMA[key]

    if (!_isFunction(validator)) {
      throw new Error(
        `invalid schema validator for key ${key} [type ${typeof validator}]`
      )
    }

    debug(
      'validating %s [%s] type %s w/ %s',
      key, v, typeof v, validator.prototype.constructor.name
    )

    return !validator(v)
  })
}
