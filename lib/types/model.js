'use strict'

/**
 * A {@link external:bfx-hf-models} model as defined by a path in the database,
 * name, type, schema, and any required data depending on the model type.
 *
 * @typedef {object} Model
 * @property {string} path - location in database; final path depends on the
 *   adapter used, with this property only needing to be unique. May be a table
 *   name or key in an in-memory DB.
 * @property {string} name - human readable model name
 * @property {string} type - model type
 * @property {object} schema - map of record key names to Javascript
 *   primitive types, i.e. `{ gid: String }`
 * @property {string|Function} [mapKey] - required for map models, either a
 *   string with the key name or a function taking a model instance as the only
 *   argument and returning the model's unique key.
 * @property {string} [index] - name of key used as index for collections
 *   instead of position in the collection. Meant to be used in conjunction
 *   with `indexMatches` for updating documents in upserts. Only for
 *   **collection** models.
 * @property {string[]} [indexMatches] - array of key names which must match
 *   for two records to be considered the same in a collection. Used to update
 *   documents in upserts. Only for **collection** models.
 */
