const _isFinite = require('lodash/isFinite')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isBoolean = require('lodash/isBoolean')

module.exports = {
  NUMBER: _isFinite,
  OBJECT: _isObject,
  STRING: _isString,
  BOOLEAN: _isBoolean,
}
