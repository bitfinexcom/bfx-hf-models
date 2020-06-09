'use strict'

const MODEL_TYPES = require('../model_types')

/**
 * Model for storage of generic encrypted secrets. Used by
 * {@link external:bfx-hf-server} and {@link external:bfx-hf-ui} for storing
 * encrypted API credentials.
 *
 * @type {Model}
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
