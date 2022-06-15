const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'strategies',
  name: 'Strategy',
  type: MODEL_TYPES.MAP,
  schema: {
    id: String,

    label: String,
    cryptedLabel: String,

    strategyContent: {
      defineIndicators: String,
      onPriceUpdate: String,
      onEnter: String,
      onUpdate: String,
      onUpdateLong: String,
      onUpdateShort: String,
      onUpdateClosing: String,
      onPositionOpen: String,
      onPositionUpdate: String,
      onPositionClose: String,
      onStart: String,
      onStop: String,
    },
    
    strategyOptions: Object,
    exchangeData: Object,
  },

  mapKey: ({ id }) => id
})
