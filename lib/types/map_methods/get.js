'use strict'

/**
 * Function that returns a single record by ID. Also accepts a record-like
 * object containing at least the ID (i.e. `{ id: 42 }`)
 *
 * @callback module:bfx-hf-models.DBAdapterMapMethods~get
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {object|string|number} docOrID - record to fetch or its ID
 * @returns {object} record - matching record
 */
