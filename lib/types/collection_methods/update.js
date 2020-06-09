'use strict'

/**
 * Function that updates all records matching the criteria with the provided
 * data.
 *
 * @callback DBAdapterCollectionMethods~update
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {DBAdapterCriteria[]} criteria - array of
 *   criteria to be met for a record to be updated
 * @param {object} data - data to saved on matching records; partial update
 * @returns {number} nModified - number of modified records
 */
