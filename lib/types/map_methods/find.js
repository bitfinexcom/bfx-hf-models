'use strict'

/**
 * Function that returns all records matching the provided criteria.
 *
 * @callback DBAdapterMapMethods~find
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {DBAdapterCriteria[]} criteria - array of
 *   conditions to apply to records in the collection; the first record meeting
 *   all conditions is returned as the "found" record.
 * @returns {object[]} records - array of records matching the provided
 *   criteria
 */
