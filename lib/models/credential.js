'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Model for storage of generic encrypted secrets. Used by
 * {@link module:bfx-hf-server|bfx-hf-server} and
 * {@link module:bfx-hf-ui|bfx-hf-ui} for storing encrypted API credentials.
 *
 * @name module:bfx-hf-models/Credential
 * @memberof module:bfx-hf-models
 * @type {module:bfx-hf-models.Model}
 * @constant
 * @readonly
 */
const Credential = {
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
}

module.exports = () => Credential
