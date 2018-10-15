'use strict'

const Mongoose = require('mongoose')

const schema = new Mongoose.Schema({
  algoID: String,
  gid: String,
  state: Object,
  active: Boolean,
})

const AlgoOrder = Mongoose.model('AlgoOrder', schema)

module.exports = AlgoOrder