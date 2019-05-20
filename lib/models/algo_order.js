const FIELD_TYPES = require('../field_types')
const MODEL_TYPES = require('../model_types')

const TYPE = MODEL_TYPES.COLLECTION
const PATH = 'algo_orders'
const SCHEMA = {
  gid: FIELD_TYPES.STRING,
  algoID: FIELD_TYPES.STRING,
  state: FIELD_TYPES.OBJECT,
  active: FIELD_TYPES.BOOLEAN,
}

const _ID = ({ algoID, gid } = {}) => `${algoID}-${gid}`
const _key = (args = {}) => `${PATH}.${_ID(args)}`
const model = (db) => {
  const set = (ao = {}) => db.set(_key(ao), ao).write()
  const rm = (ao = {}) => db.remove(_key(ao)).write()
  const get = (ao = {}) => db.get(_key(ao)).value()
  const getAll = () => db.get(PATH).values().value()
  const getActive = () => getAll().filter({ active: true }).value()

  return {
    set, rm, get, getAll, getActive,
  }
}

model.SCHEMA = SCHEMA
model.PATH = PATH
model.TYPE = TYPE

module.exports = model
