'use strict'

const debug = require('debug')('bfx:hf:models:candle:sync')
const genSyncRange = require('../../util/gen_sync_range')
const { candleWidth } = require('bfx-hf-util')

/**
 * @param {RESTv2} rest
 * @param {Object} args
 * @param {boolean?} args.forceSync - if true, no gap filling is performed
 * @param {string} args.symbol
 * @param {string} args.tf
 * @param {number} args.start
 * @param {number} args.end
 */
module.exports = genSyncRange('candles', ({ tf }) => {
  return candleWidth(tf) * 2 // for maxDiscrepancy
}, ['symbol', 'tf'], debug)
