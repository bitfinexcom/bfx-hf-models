'use strict'

/**
 * Function that adds a new record to the collection.
 *
 * @callback DBAdapterCollectionMethods~insert
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {object} record - record to be inserted
 * @returns {object} record - inserted record data
 */
