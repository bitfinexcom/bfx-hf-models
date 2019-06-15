'use strict'

const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')

const REQUIRED_COLLECTION_METHODS = [
  'getAll', 'getInRange', 'insert', 'rmAll', 'update',
]

const REQUIRED_MAP_METHODS = [
  'get', 'set', 'create', 'update', 'rm', 'find',
]

/**
 * Verifies that the provided adapter implements all required map/collection
 * methods. Throws on discrepancy.
 *
 * @param {Object} adapter
 */
module.exports = (adapter) => {
  const { db, name, mapMethods, collectionMethods } = adapter

  if (!_isObject(db)) {
    throw new Error('adapter does not provide db object')
  } else if (!_isString(name) || _isEmpty(name)) {
    throw new Error('adapter missing name')
  }

  REQUIRED_MAP_METHODS.forEach(methodName => {
    if (!_isFunction(mapMethods[methodName])) {
      throw new Error(`adapter ${name} missing map method '${methodName}'`)
    }
  })

  REQUIRED_COLLECTION_METHODS.forEach(methodName => {
    if (!_isFunction(collectionMethods[methodName])) {
      throw new Error(`adapter ${name} missing collection method '${methodName}'`)
    }
  })
}