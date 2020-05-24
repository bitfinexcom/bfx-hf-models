'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Map of per-user settings for the {@link module:bfx-hf-ui|bfx-hf-ui} trading
 * application.
 *
 * @todo refactor into generic settings object, or move out of this module
 * altogether. It is too specific to {@link module:bfx-hf-ui|bfx-hf-ui}
 *
 * @name module:bfx-hf-models/UserSettings
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
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
