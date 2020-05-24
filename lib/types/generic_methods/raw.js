'use strict'

/**
 * Function providing access to the underlying database object for custom
 * queries.
 *
 * @callback module:bfx-hf-models.DBAdapterGenericMethods~raw
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {Function} cb - called with `(db, model)`, must return a promise
 * @returns {Promise} p - as returned by the callback `cb`
 */
