const MODEL_TYPES = require('../model_types')

module.exports = () => ({
  path: 'strategy_execution',
  name: 'StrategyExecution',
  type: MODEL_TYPES.MAP,
  schema: {
    id: String,
    label: String,
    symbol: String,
    strategyId: String,
    strategyOptions: Object,
    startedOn: Date,
    stoppedOn: Date,
    results: Object
  },

  mapKey: ({ id }) => (id)
})
