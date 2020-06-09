'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Algorithmic order model. Stores execution state.
 *
 * @type {Model}
 * @constant
 * @readonly
 */
const AlgoOrder = {
  path: 'algo_orders',
  name: 'Algo Order',
  type: MODEL_TYPES.MAP,
  mapKey: ({ gid, algoID }) => (`${gid}-${algoID}`),
  schema: {
    gid: String,
    algoID: String,
    state: Object,
    active: Boolean,
    exchangeData: Object
  }
}

module.exports = () => AlgoOrder
