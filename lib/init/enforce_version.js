const debug = require('debug')('bfx:hf:models:init:enforce-version')
const DB_VERSION = require('./version')

/**
 * Clears & sets default data in the DB if there is a version mis-match
 *
 * @param {LowDBInstance} db
 * @param {Object} defaultData - required to prevent circ dep
 * @return {boolean} cleared
 */
module.exports = (db, defaultData) => {
  const reportedVersion = db.get('_version').value()

  if (reportedVersion === DB_VERSION) {
    return false
  }

  debug(
    'DB version miss-match; have %d, want %d',
    reportedVersion, DB_VERSION
  )

  debug('clearing data...')

  db.setState({}).write()
  db.defaults(defaultData).write()

  return true
}
