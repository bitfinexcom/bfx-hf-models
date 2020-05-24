'use strict'

const HFDB = require('./lib/db')

/**
 * This module implements a backend-agnostic database system for the Bitfinex
 * Honey Framework. It is used by all HF repos for data storage, i.e:
 *
 * * {@link module:bfx-hf-data-server|bfx-hf-data-server}
 * * {@link module:bfx-hf-algo-server|bfx-hf-algo-server}
 * * {@link module:bfx-hf-server|bfx-hf-server}
 *
 * Both the DB backend and exchange-specific schema methods can be configured
 * upon initialization. There are currently two official exchange adapters:
 *
 * * {@link module:bfx-hf-ext-plugin-bitfinex|bfx-hf-ext-plugin-bitfinex} -
 *   implements Bitfinex-specific model methods
 * * {@link module:bfx-hf-ext-plugin-dummy|bfx-hf-ext-plugin-dummy} - provides
 *   the base set of DB methods
 *
 * Besides these, two DB backends are available:
 *
 * * {@link module:bfx-hf-models-adapter-lowdb|bfx-hf-models-adapter-lowdb}
 * * {@link module:bfx-hf-models-adapter-sql|bfx-hf-models-adapter-sql} - uses
 *   knex internally, allowing flexibility in DB selection
 *
 * For the required database adapter structure, see
 * {@link module:bfx-hf-models-adapter-template|bfx-hf-models-adapter-template}
 * or directly {@link module:bfx-hf-models.DBAdapter}
 *
 * ### Features
 *
 * * DB-agnostic; currently two official backends are supported: `lowdb` and
 *   `knex` for SQL databases.
 * * Exchange-agnostic; exchange-specific sync logic is provided via a plugin
 *   system
 *
 * #### Available Models
 * * {@link module:bfx-hf-models/AlgoOrder|AlgoOrder} Algorithmic Order for
 *   usage with {@link module:bfx-hf-algo|bfx-hf-algo}
 * * {@link module:bfx-hf-models/Backtest|Backtest} Backtest results for
 *   {@link module:bfx-hf-strategy|bfx-hf-strategy} and
 *   {@link module:bfx-hf-data-server|bfx-hf-data-server}
 * * {@link module:bfx-hf-models/Candle|Candle} to be used with backtests
 * * {@link module:bfx-hf-models/Trade|Trade} to be used with backtests
 * * {@link module:bfx-hf-models/Credential|Credential} for encrypted user
 *   secrets used with {@link module:bfx-hf-server|bfx-hf-server} (i.e. API
 *   keys)
 * * {@link module:bfx-hf-models/Market|Market} providing available exchange
 *   market data for {@link module:bfx-hf-server|bfx-hf-server}
 * * {@link module:bfx-hf-models/Strategy|Strategy} to save trading strategies
 *   created with {@link module:bfx-hf-strategy|bfx-hf-strategy}
 * * {@link module:bfx-hf-models/UserSettings|User Settings} to store settings
 *   for the {@link module:bfx-hf-ui|bfx-hf-ui} application.
 *
 * ### Installation
 *
 * ```bash
 * npm i --save bfx-hf-models
 * ```
 *
 * ### Quickstart
 *
 * ```js
 * const HFDB = require('bfx-hf-models')
 * const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
 * const { schema: DummySchema } = require('bfx-hf-ext-plugin-dummy')
 *
 * const db = new HFDB({
 *   schema: DummySchema,
 *   adapter: HFDBLowDBAdapter({
 *     dbPath: './db.json',
 *   })
 * })
 *
 * // db is now ready to be used; see examples below
 * ```
 *
 * @license Apache-2.0
 * @module bfx-hf-models
 */

module.exports = HFDB
