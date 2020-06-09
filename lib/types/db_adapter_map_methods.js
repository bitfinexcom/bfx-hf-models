'use strict'

/**
 * A set of functions providing functionality for operating on **Map** models
 * (records identified by a unique key). Additional methods may be provided and
 * will be made available on any **Map** models, but those listed here are
 * required for a valid {@link external:bfx-hf-models} database adapter.
 *
 * @typedef {object} DBAdapterMapMethods
 * @property {DBAdapterMapMethods~create} create - record creation method
 *   (throws error if the record already exists)
 * @property {DBAdapterMapMethods~update} update - record update (full) method
 *   (throws error if the record does not exist)
 * @property {DBAdapterMapMethods~find} find - record query method, accepting
 *   an array of one or multiple criteria to be matched
 * @property {DBAdapterMapMethods~getAll} getAll - full collection query
 *   method; must return a map of all records key'ed by `mapKey` as stored in
 *   the DB.
 * @property {DBAdapterMapMethods~get} get - single record query method by ID
 *   or record-like object containing ID.
 * @property {DBAdapterMapMethods~set} set - single record create/update method
 * @property {DBAdapterMapMethods~rm} rm - single record removal method; throws
 *   an error if the record does not exist
 */
