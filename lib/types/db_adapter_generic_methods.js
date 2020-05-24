'use strict'

require('./generic_methods/raw')

/**
 * A set of functions shared by both **Map** and **Collection** models.
 * Additional methods may be provided and will be made available on any models,
 * but those listed here are required for a valid
 * {@link module:bfx-hf-models|bfx-hf-models} database adapter.
 *
 * @typedef {object} module:bfx-hf-models.DBAdapterGenericMethods
 * @property {module:bfx-hf-models.DBAdapterGenericMethods~raw} raw - raw
 *   database query method
 */
