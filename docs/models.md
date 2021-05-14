### Available Models

* `AlgoOrder` - map `{ gid, algoID, state, active, exchangeData }`
* `Backtest` - map `{ indicators, trades, symbol, tf, from, to, btID, strategyID, exchangeData }`
* `Candle` - collection `{ open, high, low, close, volume, exchange, symbol, tf, mts, exchangeData }`
* `Credential` - map `{ cid, key, secret, meta, exchangeData }`
* `Strategy` - map `{ id, label, cryptedLabel, defineIndicators, onPriceUpdate, onEnter, onUpdate, onUpdateLong, onUpdateShort, onUpdateClosing, onPositionOpen, onPositionUpdate, onPositionClose, onStart, onStop, exchangeData }`
* `Trade` - collection `{ price, amount, mts, exchange, symbol, exchangeData }`
