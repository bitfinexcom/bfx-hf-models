const MODEL_TYPES = require('../model_types')

const StrategyExecution = () => ({
  path: 'strategy_execution',
  name: 'StrategyExecution',
  type: MODEL_TYPES.COLLECTION,

  schema: {
    strategyID: String,

    active: Boolean,
    startedMTS: Date,
    endedMTS: Date,

    state: Object,
    events: Array,
    symbol: String,
    tf: String,

    exchangeData: Object
  }
})

module.exports = StrategyExecution
