'use strict'

/**
 * @param {Object} args
 * @param {string} args.symbol
 * @param {Trade[]} trades - array of bfx-api-node-models Trade
 * @return {Promise} p - resolves to result of insertMany call
 */
module.exports = async function ({ symbol } = {}, trades = []) {
  return this.insertMany(trades.map(t => ({
    bfx_id: t.id,
    price: t.price,
    amount: t.amount,
    mts: t.mts,
    symbol,
  })))
}
