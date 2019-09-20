const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'credential',
  name: 'Credential',
  type: MODEL_TYPES.MAP,
  schema: {
    cid: String,
    key: String,
    secret: String,
    meta: String,

    exchangeData: Object
  },

  mapKey: ({ cid }) => (cid)
})
