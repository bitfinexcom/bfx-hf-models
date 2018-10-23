'use strict'

const Promise = require('bluebird')
const PromiseThrottle = require('promise-throttle')

const FETCH_LIMIT = 1000
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0, // taken from docs
  promiseImplementation: Promise
})

/**
 * Fetches candles in the requested interval from the server; due to sorting,
 * they will be returned from the start time requested up to FETCH_LIMIT candles
 *
 * @param {RESTv2} rest
 * @param {Object} args
 * @param {string} args.symbol
 * @param {string} args.tf
 * @param {number} args.start
 * @param {number} args.end
 * @return {Promise} p - resolves to an array of trades
 */
module.exports = async (rest, { symbol, tf, start, end } = {}) => {
  return pt.add(
    rest.candles.bind(rest, {
      timeframe: tf,
      symbol,
      query: {
        start,
        end,
        limit: FETCH_LIMIT,
        sort: 1,
      }
    })
  )
}
