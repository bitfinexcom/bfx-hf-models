'use strict'

/**
 * Function that creates a **Map** model record in the database. Like all
 * database methods, it is provided the initialized **model** object, which as
 * per the spec provides a `mapKey` function argument which is defined on the
 * model itself, and used to generate the unique key.
 *
 * To create **or** update a record if it already exists, see
 * {@link DBAdapterMapMethods~set}
 *
 * @callback DBAdapterMapMethods~create
 * @throws {Error} if a record already exists with the same key
 * @async
 *
 * @param {object} db - database object as provided by adapter
 * @param {Model} model - initialized model instance
 * @param {object} data - data to be saved as a new record
 * @returns {object} record - created record
 */
