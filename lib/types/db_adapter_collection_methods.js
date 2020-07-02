'use strict'

/**
 * A set of functions providing functionality for operating on **Collection**
 * models (records identified by index in an array). Additional methods may be
 * provided and will be made available on any **Collection** models, but those
 * listed here are required for a valid database adapter.
 *
 * @typedef {object} DBAdapterCollectionMethods
 * @property {DBAdapterCollectionMethods~find} find -
 *   record query function, returning an array of matches
 * @property {DBAdapterCollectionMethods~rmAll} rmAll -
 *   mass record delete function
 * @property {DBAdapterCollectionMethods~getAll} getAll -
 *   mass record query function; same as `find` but with no criteria
 * @property {DBAdapterCollectionMethods~update} update -
 *   record update function accepting an array of criteria; may update multiple
 *   records at once
 * @property {DBAdapterCollectionMethods~insert} insert -
 *   record creation method
 * @property {DBAdapterCollectionMethods~getInRange} getInRange -
 *   high-level method to query records by criteria and a range of possible key
 *   values, with optional sorting of results.
 * @property {DBAdapterCollectionMethods~bulkInsert} bulkInsert -
 *   similar to {@link DBAdapterCollectionMethods~insert}, but meant for
 *   multiple records and intended to run as one database transaction (should
 *   be more performant than individual `insert` calls, but implementation is
 *   up to the adapter)
 */
