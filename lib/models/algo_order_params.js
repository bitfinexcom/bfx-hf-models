const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'algo_order_params',
  name: 'AlgoOrderParams',
  type: MODEL_TYPES.MAP,
  schema: {
    id: String,
    name: String,
    algoID: String,
    symbol: String,
    params: Object
  },

  mapKey: ({ id }) => id
})
