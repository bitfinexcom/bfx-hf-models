'use strict'

require('../db_adapter_criteria')

/**
 * Function that returns all records matching the provided criteria, and having
 * a key with a value in the provided start/end range (numeric).
 *
 * @callback module:bfx-hf-models.DBAdapterCollectionMethods~getInRange
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {module:bfx-hf-models.DBAdapterCriteria[]} criteria - array of
 *   criteria to be met for a record to be matched, prior to range check
 * @param {object} range - range definition
 * @param {string} range.key - key name on records to be checked against
 *   start/end limits
 * @param {number} range.start - minimum value for `range.key`
 * @param {number} range.end - maximum value for `range.key`
 * @param {object} [sort] - sort parameters
 * @param {string} [sort.orderBy] - key to sort results by
 * @param {string} [sort.orderDirection] - `'desc'` for descending results,
 *   otherwise ascending.
 * @returns {object[]} records - matching records
 */
