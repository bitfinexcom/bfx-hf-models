'use strict'

/**
 * Function that deletes a single record by ID. Also accepts a record-like
 * object containing at least the ID (i.e. `{ id: 42 }`).
 *
 * @callback DBAdapterMapMethods~rm
 * @throws {Error} if the record does not exist
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {object|string|number} docOrID - record to remove or its ID
 */
