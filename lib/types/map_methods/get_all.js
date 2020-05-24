'use strict'

/**
 * Function that returns all records in a **Map** as an object, with records
 * key'ed by their map key.
 *
 * @callback module:bfx-hf-models.DBAdapterMapMethods~getAll
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @returns {object} records - map of all records, key'ed by `mapKey`
 */
