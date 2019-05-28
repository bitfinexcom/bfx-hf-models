const { TIME_FRAME_WIDTHS } = require('bfx-hf-util')
const _isFinite = require('lodash/isFinite')

module.exports = ({ getInRange }) => (doc, { start, end }) => {
  const gaps = []
  const { tf } = doc
  const candles = getInRange(doc, { start, end })

  if (candles.length < 2) {
    return { gaps, candles }
  }

  const width = TIME_FRAME_WIDTHS[tf]

  if (!_isFinite(width)) {
    throw new Error(`invalid time frame [unknown width]: ${tf}`)
  }

  for (let i = 0; i < candles.length - 1; i += 1) {
    if ((candles[i].mts - candles[i + 1].mts) !== width) {
      gaps.push(i)
    }
  }

  return { gaps, candles }
}
