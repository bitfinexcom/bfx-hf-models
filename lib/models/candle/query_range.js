'use strict'

/**
 * @param {Object} args
 * @param {string} symbol
 * @param {string} tf
 * @param {Date} start
 * @param {Date} end
 * @return {Promise} p - resolves to candles
 */
module.exports = async function ({ symbol, tf, start, end } = {}) {
  const candles = await this
    .find({
      symbol,
      tf,
      mts: {
        $gte: start,
        $lte: end
      }
    })
    .exec()

  candles.sort((a, b) => a.mts - b.mts)

  return candles
}
