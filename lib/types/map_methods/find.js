'use strict'

require('../db_adapter_criteria')

/**
 * Function that returns all records matching the provided criteria.
 *
 * @callback module:bfx-hf-models.DBAdapterMapMethods~find
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {module:bfx-hf-models.DBAdapterCriteria[]} criteria - array of
 *   conditions to apply to records in the collection; the first record meeting
 *   all conditions is returned as the "found" record.
 * @returns {object[]} records - array of records matching the provided
 *   criteria
 */
