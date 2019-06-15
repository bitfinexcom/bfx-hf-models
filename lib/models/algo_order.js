const MODEL_TYPES = require('../model_types')

module.exports = {
  path: 'algo_orders',
  type: MODEL_TYPES.MAP,
  schema: {
    gid: String,
    algoID: String,
    state: Object,
    active: Boolean,

    exchangeData: Object,
  },

  mapKey: ({ gid, algoID }) => (`${gid}-${algoID}`),

  requiredMethods: [
    'getActive',
    'start',
    'stop',
  ]
}
