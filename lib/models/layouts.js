const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'layouts',
  name: 'Layouts',
  type: MODEL_TYPES.MAP,
  schema: {
    id: String,
    name: String,
    routePath: String,
    canDelete: Boolean,
    isDefault: Boolean,
    savedAt: Number,
    layout: Array,
  },
  mapKey: ({ id }) => {
    return id
  }
})
