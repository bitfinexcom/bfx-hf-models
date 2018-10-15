'use strict'

const { preprocessRemoteCandles, candleWidth } = require('bfx-hf-util')

/**
 * @param {Object} args
 * @param {Object?} args.prevLastElement - last element of previous series
 * @param {string} args.symbol
 * @param {string} args.tf
 * @param {Candle[]} candles - array of bfx-api-node-models Candle
 * @return {Promise} p - resolves to result of insertMany call
 */
module.exports = async function ({
  prevLastElement,
  symbol,
  tf
} = {}, candles = []) {
  const processedCandles = preprocessRemoteCandles(tf, [...candles], true)

  if (processedCandles.length === 0) {
    return
  }

  // Pad at start of candles if required
  if (prevLastElement) {
    const firstCandle = processedCandles[0]
    const width = candleWidth(tf)
    const lastTS = prevLastElement.mts
    const { close } = prevLastElement
    const paddingCandles = []
    let nextTS = lastTS + width

    while (nextTS < firstCandle.mts) {
      paddingCandles.push({
        open: close,
        high: close,
        low: close,
        close,
        vol: 0,
        mts: nextTS
      })

      nextTS += width
    }

    if (paddingCandles.length > 0) {
      processedCandles.unshift(...paddingCandles)
    }
  }

  try {
    await this.insertMany(processedCandles.map(c => ({
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
      vol: c.volume,
      mts: c.mts,
      type: 'hist',
      symbol,
      tf
    }), { ordered: false }))
  } catch (e) {
    // ignore BulkWriteError, since non-duplicate documents were still inserted
    if (e.name !== 'BulkWriteError') {
      throw e
    }
  }

  return processedCandles
}
