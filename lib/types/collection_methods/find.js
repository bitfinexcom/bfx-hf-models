'use strict'

require('../db_adapter_criteria')

/**
 * Function returning all records matching the provided criteria.
 *
 * @callback module:bfx-hf-models.DBAdapterCollectionMethods~find
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {module:bfx-hf-models.DBAdapterCriteria[]} criteria - array of
 *   criteria which must be met for a record to be included in the results
 * @returns {object[]} records - matching records
 */
