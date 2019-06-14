process.env.DEBUG = 'bfx:hf:models:examples:*'

require('dotenv').config()

const debug = require('debug')('bfx:hf:models:examples:create')
const { AlgoOrder } = require('../lib/models')
const DB = require('../lib/db')

const { DB_FILENAME } = process.env
const db = DB(DB_FILENAME)

const {
  create: createAO,
  get: getAO,
  rm: rmAO
} = AlgoOrder(db)

const aoID = {
  algoID: 'test-algo-id',
  gid: 'test-gid'
}

const aoDoc = {
  ...aoID,
  active: false,
  state: { data: 42 }
}

debug('creating AO...')
createAO(aoDoc)
debug('fetching created AO...')

const ao = getAO(aoID)

debug('read AO %j', ao)
debug('attempting to overwrite w/ create...')

try {
  createAO(aoDoc)
  debug('overwrite succeeded, panic')
  process.exit(1)
} catch (_) {
  debug('overwrite failed as expected')
}

debug('deleting AO...')
rmAO(aoID)
debug('confirming...')

if (getAO(aoID)) {
  debug('AO not deleted, panic')
  process.exit(1)
} else {
  debug('AO deleted successfully')
}
