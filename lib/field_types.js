const _isFinite = require('lodash/isFinite')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isBoolean = require('lodash/isBoolean')
const _isArray = require('lodash/isArray')
const _isDate = require('lodash/isDate')

const _isDateHF = v => (_isFinite(v) && v >= 0) || _isDate(v)

module.exports = {
  NUMBER: _isFinite,
  OBJECT: _isObject,
  STRING: _isString,
  BOOLEAN: _isBoolean,
  ARRAY: _isArray,
  DATE: _isDateHF
}
