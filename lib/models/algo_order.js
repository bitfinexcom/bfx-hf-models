'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Algorithmic order model schema.
 *
 * @name module:bfx-hf-models/AlgoOrderSchema
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
 * @constant
 * @readonly
 */
const AlgoOrderSchema = {
  /**
   * Atomic order group ID
   *
   * @type {string}
   */
  gid: String,

  /**
   * Unique algorithm ID
   *
   * @type {string}
   */
  algoID: String,

  /**
   * Object containing serialized execution state. Passed to order unserialize
   * handler when loading, prior to resuming execution.
   *
   * @see module:bfx-hf-algo
   * @type {object}
   */
  state: Object,

  /**
   * Flag indicating if the order is running (executing)
   *
   * @type {boolean}
   */
  active: Boolean,

  /**
   * Optional data object, present on all models for exchange-specific data
   *
   * @type {object}
   */
  exchangeData: Object
}

/**
 * Algorithmic order model. Stores execution state.
 *
 * @see module:bfx-hf-models/AlgoOrderSchema
 * @name module:bfx-hf-models/AlgoOrder
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
 * @constant
 * @readonly
 */
const AlgoOrder = {
  path: 'algo_orders',
  name: 'Algo Order',
  type: MODEL_TYPES.MAP,
  schema: AlgoOrderSchema,
  mapKey: ({ gid, algoID }) => (`${gid}-${algoID}`)
}

module.exports = () => AlgoOrder
