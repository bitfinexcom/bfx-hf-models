const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'strategies',
  name: 'Strategy',
  type: MODEL_TYPES.MAP,
  schema: {
    id: String,
    version: String,
    label: Number,
    cryptedLabel: String,

    defineMeta: String,
    defineIndicators: String,
    exec: String,

    exchangeData: Object
  },

  mapKey: ({ id }) => id
})
