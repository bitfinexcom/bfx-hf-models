'use strict'

const _isObject = require('lodash/isObject')

const processSchema = require('./util/process_schema')
const validateModel = require('./validate/model')
const validateAdapter = require('./validate/adapter')
const attachAdapterToModel = require('./util/attach_adapter_to_model')

/**
 * Database class, takes a storage adapter and database schema as constructor
 * options, then handles model persistence.
 *
 * @example
 * const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
 * const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
 * const { PSQL_CONNECTION } = process.env
 *
 * const db = new HFDB({
 *   schema: HFDBBitfinexSchema,
 *   adapter: HFDBSQLAdapter({
 *     connection: PSQL_CONNECTION,
 *     clientType: 'pg'
 *   })
 * })
 *
 * const { Trade } = db
 * const trades = await Trade.getAll()
 *
 * trades.forEach(t => console.log(JSON.stringify(t, null, 2)))
 *
 * @class
 * @memberof module:bfx-hf-models
 */
class HFDB {
  /**
   * Create a new database instance. Models will be key'ed by name on the class
   * after initialization.
   *
   * @throws {Error} if given an invalid adapter (missing required method or
   *   having an otherwise invalid structure)
   *
   * @param {object} args - arguments
   * @param {module:bfx-hf-models.DBAdapter} args.adapter - database adapter.
   *   See {@link module:bfx-hf-models-adapter-sql} for an example, or the type
   *   definition itself for a listing of required logic.
   * @param {object} args.schema - database schema providing custom models on
   *   top of the builtins. See {@link module:bfx-hf-ext-plugin-bitfinex} for
   *   an example.
   */
  constructor ({ adapter, schema }) {
    validateAdapter(adapter)

    const processedSchema = processSchema(schema)

    // Setup models w/ adapter DB methods
    Object.keys(processedSchema).forEach(modelName => {
      const model = processedSchema[modelName]

      attachAdapterToModel(adapter, model)

      // Pull in custom model methods
      const { methods: customMethods } = model

      if (_isObject(customMethods)) {
        Object.keys(customMethods).forEach(customMethodName => {
          const m = customMethods[customMethodName]

          model[customMethodName] = m.bind(model, model)
        })
      }

      validateModel(model)

      this[modelName] = model // i.e. const { Candle } = db
    })

    this.adapter = adapter
  }

  /**
   * Closes any DB connection; calls through to `close()` on the adapter, hence
   * behavior is dependent on the adapter used.
   */
  close () {
    this.adapter.close()
  }
}

module.exports = HFDB
