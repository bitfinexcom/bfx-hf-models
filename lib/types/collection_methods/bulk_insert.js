'use strict'

/**
 * Function that inserts an array of records at once into the database. Meant
 * for large inserts, should be optimized within the respective adapter.
 *
 * @callback module:bfx-hf-models.DBAdapterCollectionMethods~bulkInsert
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {object[]} records - records to insert
 * @returns {object[]} insertedRecords
 */
