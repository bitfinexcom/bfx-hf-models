const DEBUG_STR = 'bfx:hf:models:trade:sync-range' // for pretty formatting

const Promise = require('bluebird')
const _last = require('lodash/last')
const _max = require('lodash/max')
const debug = require('debug')(DEBUG_STR)
const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')

const TRADE_GAP_LIMIT = 60 * 1000 // 1 minute
const FETCH_LIMIT = 5000
const rest = new RESTv2({ transform: true })
const pt = new PromiseThrottle({
  requestsPerSecond: 10.0 / 60.0, // taken from docs
  promiseImplementation: Promise
})

module.exports = ({
  getInRange, insert, write
}) => async ({ symbol } = {}, { start, end }) => {
  const trades = getInRange({ symbol }, { start, end })
  const syncBounds = trades.length === 0
    ? { start, end }
    : { start: _max(trades).mts, end }

  if (syncBounds.end - syncBounds.start < TRADE_GAP_LIMIT) {
    return Promise.resolve()
  }

  debug('syncing range %d-%d', syncBounds.start, syncBounds.end)
  let lastTradeMTS = syncBounds.start - 1 // to counter offset in loop

  while (lastTradeMTS < end) {
    const incomingTrades = await pt.add(rest.trades.bind(
      rest, symbol, lastTradeMTS + 1, syncBounds.end, FETCH_LIMIT, 1
    ))

    if (incomingTrades.length === 0) {
      debug(
        'fetched empty trade set (%s -> %s), considering finished.',
        new Date(lastTradeMTS + 1).toLocaleString(),
        new Date(syncBounds.end).toLocaleString()
      )
      break
    }

    debug(
      'fetched %d trades (%s -> %s)',
      incomingTrades.length, new Date(lastTradeMTS + 1).toLocaleString(),
      new Date(syncBounds.end).toLocaleString()
    )

    incomingTrades.forEach(t => insert({
      ...t,
      symbol,
      bfxID: t.id,
    }))

    write()

    lastTradeMTS = _last(incomingTrades).mts

    debug(
      'fetching max %d trades from %s...',
      FETCH_LIMIT, new Date(lastTradeMTS).toLocaleString()
    )
  }


  return Promise.resolve()
}
