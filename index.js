'use strict'

const db = require('./lib/db')
const models = require('./lib/models')

module.exports = {
  initDB: db,
  ...models
}
