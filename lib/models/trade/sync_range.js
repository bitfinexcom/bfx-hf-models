const Promise = require('bluebird')

/*
const DEBUG_STR = 'bfx:hf:models:trade:sync-range' // for pretty formatting

const debug = require('debug')(DEBUG_STR)
const PI = require('p-iteration')
const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')

const FETCH_LIMIT = 5000
const rest = new RESTv2({ transform: true })
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0, // taken from docs
  promiseImplementation: Promise
})
*/

// TODO: implement
module.exports = ({ insert }) => ({ symbol } = {}, { start, end }) => {
  return Promise.resolve()
}
