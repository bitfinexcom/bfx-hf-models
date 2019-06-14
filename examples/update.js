process.env.DEBUG = 'bfx:hf:models:examples:*'

require('dotenv').config()

const debug = require('debug')('bfx:hf:models:examples:create')
const { AlgoOrder } = require('../lib/models')
const DB = require('../lib/db')

const { DB_FILENAME } = process.env
const db = DB(DB_FILENAME)

const {
  update: updateAO,
  create: createAO,
  get: getAO,
  rm: rmAO
} = AlgoOrder(db)

const aoID = {
  algoID: 'test-algo-id',
  gid: 'test-gid'
}

debug('creating AO w/ active: false...')

createAO({
  ...aoID,
  active: false,
  state: {}
})

debug('checking...')
const newAO = getAO(aoID)
debug('got active: %s', newAO.active)

debug('setting active: true...')

updateAO(aoID, ao => ({
  ...ao,
  active: true
}))

debug('fetching...')

const updatedAO = getAO(aoID)
debug('got active: %s', updatedAO.active)

debug('deleting...')
rmAO(aoID)
debug('confirming...')

if (getAO(aoID)) {
  debug('AO not deleted, panic')
  process.exit(1)
} else {
  debug('AO deleted successfully')
}
