'use strict'

const debug = require('debug')('bfx:hf:models:trade:sync')
const genSyncRange = require('../../util/gen_sync_range')

// Gap limit between trades without considering the gap missing data
const MAX_DISCREPANCY = 60 * 60 * 1000

/**
 * Min sync interval is the discrepancy limit, 1hr
 *
 * @param {RESTv2} rest
 * @param {Object} args
 * @param {boolean?} args.forceSync - if true, no gap filling is performed
 * @param {string} args.symbol
 * @param {number} args.start
 * @param {number} args.end
 */
module.exports = genSyncRange('trades', MAX_DISCREPANCY, ['symbol'], debug)
