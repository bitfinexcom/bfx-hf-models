'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Map of per-user settings for the {@link external:bfx-hf-ui} trading
 * application.
 *
 * @type {Model}
 * @constant
 * @readonly
 */
const UserSettings = {
  path: 'user_settings',
  name: 'UserSettings',
  type: MODEL_TYPES.MAP,
  schema: {
    dms: Boolean,
    theme: String,
    chartType: String,
    affiliateCode: String
  },
  mapKey: () => ('userSettings')
}

module.exports = () => UserSettings
