'use strict'

/**
 * @param {Object} args
 * @param {string} args.symbol
 * @param {Date} args.start
 * @param {Date} args.end
 * @return {Promise} p - resolves to trades
 */
module.exports = async function ({ symbol, start, end } = {}) {
  const trades = await this
    .find({
      symbol,
      mts: {
        $gte: start,
        $lte: end
      }
    })
    .sort({ mts: 1 })
    .lean()
    .exec()

  return trades
}
