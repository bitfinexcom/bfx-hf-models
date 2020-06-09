'use strict'

/**
 * Function that inserts an array of records at once into the database. Meant
 * for large inserts, should be optimized within the respective adapter.
 *
 * @callback DBAdapterCollectionMethods~bulkInsert
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {object[]} records - records to insert
 * @returns {object[]} insertedRecords
 */
