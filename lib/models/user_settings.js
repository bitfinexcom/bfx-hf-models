const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'user_settings',
  name: 'UserSettings',
  type: MODEL_TYPES.MAP,
  schema: {
    dms: Boolean,
    theme: String,
    chartType: String,
    affiliateCode: String,
    bgStrategyExec: Boolean
  },
  mapKey: () => ('userSettings')
})
