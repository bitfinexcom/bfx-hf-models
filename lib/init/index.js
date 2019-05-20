const debug = require('debug')('bfx:hf:models:db:init:db')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const _isEmpty = require('lodash/isEmpty')

const enforceVersion = require('./enforce_version')
const DB_DEFAULT = require('./default_data')

const { DB_FILENAME } = process.env

if (_isEmpty(DB_FILENAME)) {
  throw new Error('DB_FILENAME env var required')
}

const dbPath = `${__dirname}/../../db/${DB_FILENAME}`

debug('loading from %s', dbPath)

const adapter = new FileSync(dbPath)
const db = lowdb(adapter)

db.defaults(DB_DEFAULT).write()

if (enforceVersion(db, DB_DEFAULT)) {
  debug('!! DB reset to default !!')
}

module.exports = db
