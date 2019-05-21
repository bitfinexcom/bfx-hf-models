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

// Immediately saves the document in the DB
const algoID = 'test-algo-id'
const gid = 'test-gid'

debug('creating AO w/ ID %s, GID %s', algoID, gid)

createAO({
  gid,
  algoID,

  active: false,
  state: {
    someAlgoState: 42,
    moreState: {
      nestedFields: {
        mts: new Date()
      }
    }
  }
})

debug('fetching AO...')

const ao = getAO({ algoID, gid })

debug('read AO %s', JSON.stringify(ao, null, 2))
debug('cleaning up...')

rmAO({ algoID, gid })

debug('AO deleted. confirming...')

const nonexistentAO = getAO({ algoID, gid })

debug('read AO: %s', JSON.stringify(nonexistentAO, null, 2))
