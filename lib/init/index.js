const debug = require('debug')('bfx:hf:models:db:init:db')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const _isEmpty = require('lodash/isEmpty')
const _isString = require('lodash/isString')

const enforceVersion = require('./enforce_version')
const DB_DEFAULT = require('./default_data')

module.exports = (dbFn) => {
  if (!_isString(dbFn) || _isEmpty(dbFn)) {
    throw new Error('DB filename required')
  }

  const dbPath = `${__dirname}/../../db/${dbFn}`

  debug('loading from %s', dbPath)

  const adapter = new FileSync(dbPath)
  const db = lowdb(adapter)

  db.defaults(DB_DEFAULT).write()

  if (enforceVersion(db, DB_DEFAULT)) {
    debug('!! DB reset to default !!')
  }

  return db
}
