'use strict'

process.env.DEBUG = 'bfx:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('bfx:hf:models:examples:lowdb:map:update')
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

    const updatedRows = await AlgoOrder.update({ gid, algoID }, { active: true })
    debug('updated %d rows', updatedRows)

    const readAO = await AlgoOrder.get({ gid, algoID })
    debug('read ao with object key from DB: %j', readAO)

    db.close()
  })()
} catch (e) {
  debug('error: %s', e.stack)
}
