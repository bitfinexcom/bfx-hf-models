'use strict'

process.env.DEBUG = 'bfx:*,knex:query'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:models:examples:pg:map:rm')
const db = require('../../pg_db')
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

    const removedRows = await AlgoOrder.rm({ gid, algoID })
    debug('removed %d rows', removedRows)

    const removedAO = await AlgoOrder.get({ gid, algoID })
    debug('read AO from DB: %j', removedAO)

    db.close()
  })()
} catch (e) {
  debug('error: %s', e.stack)
}
