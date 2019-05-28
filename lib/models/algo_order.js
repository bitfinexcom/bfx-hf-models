const MODEL_TYPES = require('../model_types')
const FIELD_TYPES = require('../field_types')
const genModel = require('./util/gen_model')

module.exports = genModel({
  name: 'Algorithmic Order',
  path: 'algo_orders',
  type: MODEL_TYPES.MAP,
  schema: {
    gid: FIELD_TYPES.STRING,
    algoID: FIELD_TYPES.STRING,
    state: FIELD_TYPES.OBJECT,
    active: FIELD_TYPES.BOOLEAN
  },

  key: ({ algoID, gid } = {}) => `${algoID}:${gid}`,

  extraMethods: ({ getAll, update }) => ({
    getActive: () => getAll().filter(({ active }) => active),
    idString: (ao) => `${ao.algoID}:${ao.gid}`,

    start: (ao) => (
      update(ao, v => ({
        ...v,
        active: true
      }))
    ),

    stop: (ao) => (
      update(ao, v => ({
        ...v,
        active: false
      }))
    ),
  })
})
