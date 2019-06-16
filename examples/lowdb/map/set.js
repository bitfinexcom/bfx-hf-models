'use strict'

process.env.DEBUG = 'bfx:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:models:examples:lowdb:map:set')
const db = require('../../lowdb_db')
const { AlgoOrder } = db

try {
  (async () => {
    debug('creating algo order...')

    const gid = Date.now()
    const algoID = 'test-algo'
    const ao = await AlgoOrder.create({
      gid,
      algoID,
      state: {},
      active: false
    })

    debug('read ao from DB: %j', ao)

    debug('overwriting AO...')
    await AlgoOrder.set({ gid, algoID }, {
      gid,
      algoID,
      state: { someInternalState: 42 },
      active: true
    })

    const newAO = await AlgoOrder.get({ gid, algoID })
    debug('read updated AO from DB: %j', newAO)

    db.close()
  })()
} catch (e) {
  debug('error: %s', e.stack)
}
