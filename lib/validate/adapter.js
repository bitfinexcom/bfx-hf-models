'use strict'

const _isFunction = require('lodash/isFunction')
const _isObject = require('lodash/isObject')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')

/**
 * Array of required **Map** and **Collection** model methods
 *
 * @private
 * @constant
 * @readonly
 */
const REQUIRED_GENERIC_METHODS = ['raw']

/**
 * Array of required **Collection** model methods
 *
 * @private
 * @constant
 * @readonly
 */
const REQUIRED_COLLECTION_METHODS = [
  'find', 'getAll', 'getInRange', 'insert', 'bulkInsert', 'rmAll', 'update',
  'upsert'
]

/**
 * Array of required **Map** model methods
 *
 * @private
 * @constant
 * @readonly
 */
const REQUIRED_MAP_METHODS = [
  'get', 'getAll', 'set', 'create', 'update', 'rm', 'find'
]

/**
 * Verifies that the provided adapter implements all required map/collection
 * methods.
 *
 * @private
 * @throws {Error} on validation failure (invalid structure, missing required
 *   method, etc)
 *
 * @param {DBAdapter} adapter - adapter
 */
const validateAdapter = (adapter) => {
  const { db, name, mapMethods, genericMethods, collectionMethods } = adapter

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

  REQUIRED_GENERIC_METHODS.forEach(methodName => {
    if (!_isFunction(genericMethods[methodName])) {
      throw new Error(`adapter ${name} missing generic method '${methodName}'`)
    }
  })

  REQUIRED_COLLECTION_METHODS.forEach(methodName => {
    if (!_isFunction(collectionMethods[methodName])) {
      throw new Error(`adapter ${name} missing collection method '${methodName}'`)
    }
  })
}

module.exports = validateAdapter
