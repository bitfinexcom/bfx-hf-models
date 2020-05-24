'use strict'

require('./map_methods/create')
require('./map_methods/update')
require('./map_methods/find')
require('./map_methods/get_all')
require('./map_methods/get')
require('./map_methods/set')
require('./map_methods/rm')

/**
 * A set of functions providing functionality for operating on **Map** models
 * (records identified by a unique key). Additional methods may be provided and
 * will be made available on any **Map** models, but those listed here are
 * required for a valid {@link module:bfx-hf-models|bfx-hf-models} database
 * adapter.
 *
 * @typedef {object} module:bfx-hf-models.DBAdapterMapMethods
 * @property {module:bfx-hf-models.DBAdapterMapMethods~create} create - record
 *   creation method (throws error if the record already exists)
 * @property {module:bfx-hf-models.DBAdapterMapMethods~update} update - record
 *   update (full) method (throws error if the record does not exist)
 * @property {module:bfx-hf-models.DBAdapterMapMethods~find} find - record
 *   query method, accepting an array of one or multiple criteria to be matched
 * @property {module:bfx-hf-models.DBAdapterMapMethods~getAll} getAll - full
 *   collection query method; must return a map of all records key'ed by
 *   `mapKey` as stored in the DB.
 * @property {module:bfx-hf-models.DBAdapterMapMethods~get} get - single record
 *   query method by ID or record-like object containing ID.
 * @property {module:bfx-hf-models.DBAdapterMapMethods~set} set - single record
 *   create/update method
 * @property {module:bfx-hf-models.DBAdapterMapMethods~rm} rm - single record
 *   removal method; throws an error if the record does not exist
 */
