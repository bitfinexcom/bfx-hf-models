'use strict'

/**
 * Function that updates an existing **Map** model record in the database. Must
 * accept either the unique ID (key value) of the model to be updated, or the
 * model itself (containing the ID).
 *
 * Must perform a full update. To create a record if it does not exist (or
 * update), use {@link module:bfx-hf-models.DBAdapterMapMethods~set}
 *
 * @callback module:bfx-hf-models.DBAdapterMapMethods~update
 * @throws {Error} fails if the record does not exist.
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {module:bfx-hf-models.Model} model - initialized model instance
 * @param {object|string|number} docOrID - record to update or its ID
 * @param {object} value - new data for the record
 * @returns {number} nUpdatedRows - number of updated rows
 */
