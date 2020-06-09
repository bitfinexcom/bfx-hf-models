'use strict'

/**
 * Function that creates or updates a single record by ID. Also accepts a
 * record-like object containing at least the ID (i.e. `{ id: 42 }`).
 *
 * To ensure existing records are not modified, use
 * {@link DBAdapterMapMethods~create}
 *
 * @callback DBAdapterMapMethods~set
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {object} value - record value, containing relevant data for key
 *   generation. Any existing record with the same key will be overwritten.
 * @returns {object} record - final record value as stored in the DB
 */
