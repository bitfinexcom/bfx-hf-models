'use strict'

const HFDB = require('./lib/db')

/**
 * This module implements a backend-agnostic database system for the Bitfinex
 * Honey Framework. It is used by all HF repos for data storage, i.e:
 *
 * * {@link external:bfx-hf-data-server}
 * * {@link external:bfx-hf-algo-server}
 * * {@link external:bfx-hf-server}
 *
 * Both the DB backend and exchange-specific schema methods can be configured
 * upon initialization. There are currently two official exchange adapters:
 *
 * * {@link external:bfx-hf-ext-plugin-bitfinex} - implements Bitfinex-specific
 *   model methods
 * * {@link external:bfx-hf-ext-plugin-dummy} - provides the base set of DB
 *   methods
 *
 * Besides these, two DB backends are available:
 *
 * * {@link external:bfx-hf-models-adapter-lowdb}
 * * {@link external:bfx-hf-models-adapter-sql} - uses knex internally,
 *   allowing flexibility in DB selection
 *
 * For the required database adapter structure, see
 * {@link external:bfx-hf-models-adapter-template}
 *
 * @license Apache-2.0
 * @module bfx-hf-models
 * @example
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
 */

/**
 * @external bfx-hf-data-server
 * @see https://github.com/bitfinexcom/bfx-hf-data-server
 */

/**
 * @external bfx-hf-algo-server
 * @see https://github.com/bitfinexcom/bfx-hf-algo-server
 */

/**
 * @external bfx-hf-server
 * @see https://github.com/bitfinexcom/bfx-hf-server
 */

/**
 * @external bfx-hf-ext-plugin-bitfinex
 * @see https://github.com/bitfinexcom/bfx-hf-ext-plugin-bitfinex
 */

/**
 * @external bfx-hf-ext-plugin-dummy
 * @see https://github.com/bitfinexcom/bfx-hf-ext-plugin-dummy
 */

/**
 * @external bfx-hf-models-adapter-lowdb
 * @see https://github.com/bitfinexcom/bfx-hf-models-adapter-lowdb
 */

/**
 * @external bfx-hf-models-adapter-sql
 * @see https://github.com/bitfinexcom/bfx-hf-models-adapter-sql
 */

/**
 * @external bfx-hf-models-adapter-template
 * @see https://github.com/bitfinexcom/bfx-hf-models-adapter-template
 */

/**
 * @external bfx-hf-ui
 * @see https://github.com/bitfinexcom/bfx-hf-ui
 */

/**
 * @external bfx-hf-strategy
 * @see https://github.com/bitfinexcom/bfx-hf-strategy
 */

module.exports = HFDB
