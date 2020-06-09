'use strict'

/**
 * Function returning all records matching the provided criteria.
 *
 * @callback DBAdapterCollectionMethods~find
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {DBAdapterCriteria[]} criteria - array of
 *   criteria which must be met for a record to be included in the results
 * @returns {object[]} records - matching records
 */
