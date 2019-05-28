const initDB = require('init')
const defaultDBData = require('./default_db_data')
const { DB_FILENAME } = process.env

module.exports = initDB(DB_FILENAME, defaultDBData)
