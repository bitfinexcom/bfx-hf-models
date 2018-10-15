'use strict'

const Promise = require('bluebird')
const PromiseThrottle = require('promise-throttle')

const FETCH_LIMIT = 1000
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0, // taken from docs
  promiseImplementation: Promise
})

/**
 * Fetches trades in the requested interval from the server; due to sorting,
 * they will be returned from the start time requested up to FETCH_LIMIT trades
 *
 * @param {RESTv2} rest
 * @param {Object} args
 * @param {string} args.symbol
 * @param {number} args.start
 * @param {number} args.end
 * @return {Promise} p - resolves to an array of trades
 */
module.exports = async (rest, { symbol, start, end } = {}) => {
  return pt.add(
    rest.trades.bind(rest, symbol, start, end, FETCH_LIMIT, 1)
  )
}
