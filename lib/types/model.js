'use strict'

/**
 * A {@link module:bfx-hf-models|bfx-hf-models} model as defined by a path in
 * the database, name, type, schema, and any required data depending on the
 * model type.
 *
 * @typedef {object} module:bfx-hf-models.Model
 * @property {string} path - location in database; final path depends on the
 *   adapter used, with this property only needing to be unique. May be a table
 *   name or key in an in-memory DB.
 * @property {string} name - human readable model name
 * @property {string} type - one of {@link module:bfx-hf-models.MODEL_TYPES}
 * @property {object} schema - map of record key names to Javascript
 *   primitive types, i.e. `{ gid: String }`
 * @property {string|Function} [mapKey] - required for map models, either a
 *   string with the key name or a function taking a model instance as the only
 *   argument and returning the model's unique key.
 */
