'use strict'

const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const requiredMethods = require('./required_methods')

/**
 * Verifies that the provided adapter implements all required map/collection
 * methods. Throws on discrepancy.
 *
 * @param {Object} adapter
 */
module.exports = (adapter) => {
  const { db, name, mapMethods, genericMethods, collectionMethods } = adapter

  if (!_isObject(db)) {
    throw new Error('adapter does not provide db object')
  } else if (!_isString(name) || _isEmpty(name)) {
    throw new Error('adapter missing name')
  }

  requiredMethods.map.forEach(methodName => {
    if (!_isFunction(mapMethods[methodName])) {
      throw new Error(`adapter ${name} missing map method '${methodName}'`)
    }
  })

  requiredMethods.generic.forEach(methodName => {
    if (!_isFunction(genericMethods[methodName])) {
      throw new Error(`adapter ${name} missing generic method '${methodName}'`)
    }
  })

  requiredMethods.collection.forEach(methodName => {
    if (!_isFunction(collectionMethods[methodName])) {
      throw new Error(`adapter ${name} missing collection method '${methodName}'`)
    }
  })
}
