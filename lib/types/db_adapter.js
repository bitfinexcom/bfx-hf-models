'use strict'

require('./db_adapter_map_methods')
require('./db_adapter_collection_methods')
require('./db_adapter_generic_methods')

/**
 * Database adapter structure for usage with
 * {@link module:bfx-hf-models|bfx-hf-models}. For an example module refer to
 * {@link module:bfx-hf-models-adapter-template|bfx-hf-models-adapter-template}
 *
 * For reference implementations (in-memory & SQL) see:
 * * {@link module:bfx-hf-models-adapter-lowdb|bfx-hf-models-adapter-lowdb}
 * * {@link module:bfx-hf-models-adapter-sql|bfx-hf-models-adapter-sql}
 *
 * It must provide methods for performing all database operations required for
 * a {@link module:bfx-hf-models|bfx-hf-models} backend. Additional methods may
 * be provided and used, but the base set defined in this **type** are
 * required.
 *
 * For reference, a **Map** model is a set of records identified by a unique
 * key, and a **Collection** model is a set of records stored as an array
 * (key'ed by index).
 *
 * @typedef {object} module:bfx-hf-models.DBAdapter
 * @property {string} name - name of the adapter, i.e. 'Redis' or 'PSQL', etc
 * @property {object} db - database object provided to all methods (i.e. DB
 *   client, or in-memory DB reference, etc)
 * @property {Function} [dbInit] - if provided, this function is called to
 *   and expected to provide the `db` object, overriding any provided on this
 *   adapter. It is called with each model instance, post-initialization, and
 *   then passed to the model for all DB-related methods.
 * @property {Function} [close] - if provided, this function is called when the
 *   adapter is closed. Use this to clean up the database connection and flush
 *   any unsaved changes.
 * @property {module:bfx-hf-models.DBAdapterMapMethods} mapMethods - object of
 *   methods for operating on **Map** models (collections of records identified
 *   by unique key)
 * @property {module:bfx-hf-models.DBAdapterCollectionMethods}
 *   collectionMethods - object of methods for operating on **Collection**
 *   models (identified by index)
 * @property {module:bfx-hf-models.DBAdapterGenericMethods} - object of methods
 *   shared by all model types. i.e. raw database query support.
 */
