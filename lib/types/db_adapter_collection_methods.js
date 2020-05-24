'use strict'

require('./collection_methods/find')
require('./collection_methods/rm_all')
require('./collection_methods/get_all')
require('./collection_methods/update')
require('./collection_methods/insert')
require('./collection_methods/get_in_range')

/**
 * A set of functions providing functionality for operating on **Collection**
 * models (records identified by index in an array). Additional methods may be
 * provided and will be made available on any **Collection** models, but those
 * listed here are required for a valid
 * {@link module:bfx-hf-models|bfx-hf-models} database adapter.
 *
 * @typedef {object} module:bfx-hf-models.DBAdapterCollectionMethods
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods~find} find -
 *   record query function, returning an array of matches
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods~rmAll} rmAll -
 *   mass record delete function
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods~getAll} getAll -
 *   mass record query function; same as `find` but with no criteria
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods~update} update -
 *   record update function accepting an array of criteria; may update multiple
 *   records at once
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods~insert} insert -
 *   record creation method
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods~getInRange} getInRange -
 *   high-level method to query records by criteria and a range of possible key
 *   values, with optional sorting of results.
 */
