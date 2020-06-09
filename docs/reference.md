## Modules

<dl>
<dt><a href="#module_bfx-hf-models">bfx-hf-models</a></dt>
<dd><p>This module implements a backend-agnostic database system for the Bitfinex
Honey Framework. It is used by all HF repos for data storage, i.e:</p>
<ul>
<li><a href="https://github.com/bitfinexcom/bfx-hf-data-server">bfx-hf-data-server</a></li>
<li><a href="https://github.com/bitfinexcom/bfx-hf-algo-server">bfx-hf-algo-server</a></li>
<li><a href="https://github.com/bitfinexcom/bfx-hf-server">bfx-hf-server</a></li>
</ul>
<p>Both the DB backend and exchange-specific schema methods can be configured
upon initialization. There are currently two official exchange adapters:</p>
<ul>
<li><a href="https://github.com/bitfinexcom/bfx-hf-ext-plugin-bitfinex">bfx-hf-ext-plugin-bitfinex</a> - implements Bitfinex-specific
model methods</li>
<li><a href="https://github.com/bitfinexcom/bfx-hf-ext-plugin-dummy">bfx-hf-ext-plugin-dummy</a> - provides the base set of DB
methods</li>
</ul>
<p>Besides these, two DB backends are available:</p>
<ul>
<li><a href="https://github.com/bitfinexcom/bfx-hf-models-adapter-lowdb">bfx-hf-models-adapter-lowdb</a></li>
<li><a href="https://github.com/bitfinexcom/bfx-hf-models-adapter-sql">bfx-hf-models-adapter-sql</a> - uses knex internally,
allowing flexibility in DB selection</li>
</ul>
<p>For the required database adapter structure, see
<a href="https://github.com/bitfinexcom/bfx-hf-models-adapter-template">bfx-hf-models-adapter-template</a></p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#HFDB">HFDB</a></dt>
<dd><p>Database class, takes a storage adapter and database schema as constructor
options, then handles model persistence.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#AlgoOrder">AlgoOrder</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Algorithmic order model. Stores execution state.</p>
</dd>
<dt><a href="#Backtest">Backtest</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Strategy backtest results model, includes backtest parameters and all trades
performed by the strategy.</p>
</dd>
<dt><a href="#Candle">Candle</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>OHLCV candle model</p>
</dd>
<dt><a href="#Credential">Credential</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Model for storage of generic encrypted secrets. Used by
<a href="https://github.com/bitfinexcom/bfx-hf-server">bfx-hf-server</a> and <a href="https://github.com/bitfinexcom/bfx-hf-ui">bfx-hf-ui</a> for storing
encrypted API credentials.</p>
</dd>
<dt><a href="#Market">Market</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Exchange market metadata, used by
<a href="https://github.com/bitfinexcom/bfx-hf-server">bfx-hf-server</a> and <a href="https://github.com/bitfinexcom/bfx-hf-ui">bfx-hf-ui</a> to track
available trading markets and their API names.</p>
</dd>
<dt><a href="#Strategy">Strategy</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Strategy model, see <a href="https://github.com/bitfinexcom/bfx-hf-strategy">bfx-hf-strategy</a> and
<a href="https://github.com/bitfinexcom/bfx-hf-ui">bfx-hf-ui</a>.</p>
</dd>
<dt><a href="#Trade">Trade</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Public trade model</p>
</dd>
<dt><a href="#UserSettings">UserSettings</a> : <code><a href="#Model">Model</a></code></dt>
<dd><p>Map of per-user settings for the <a href="https://github.com/bitfinexcom/bfx-hf-ui">bfx-hf-ui</a> trading
application.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#DBAdapterCriteria">DBAdapterCriteria</a> : <code>Array</code></dt>
<dd><p>An array containing 3 values; a field name, condition, and target value. For
example:</p>
<p><code>[&#39;fieldA&#39;, &#39;&lt;&#39;, 1000]</code> - states that fieldA must be less than 1000</p>
<p>Used to run queries against the DB.</p>
</dd>
<dt><a href="#DBAdapterGenericMethods">DBAdapterGenericMethods</a> : <code>object</code></dt>
<dd><p>A set of functions shared by both <strong>Map</strong> and <strong>Collection</strong> models.
Additional methods may be provided and will be made available on any models,
but those listed here are required for a valid
<a href="external:bfx-hf-models">external:bfx-hf-models</a> database adapter.</p>
</dd>
<dt><a href="#DBAdapterMapMethods">DBAdapterMapMethods</a> : <code>object</code></dt>
<dd><p>A set of functions providing functionality for operating on <strong>Map</strong> models
(records identified by a unique key). Additional methods may be provided and
will be made available on any <strong>Map</strong> models, but those listed here are
required for a valid <a href="external:bfx-hf-models">external:bfx-hf-models</a> database adapter.</p>
</dd>
<dt><a href="#DBAdapter">DBAdapter</a> : <code>object</code></dt>
<dd><p>Database adapter structure for usage with <a href="external:bfx-hf-models">external:bfx-hf-models</a>.
For an example module refer to
<a href="https://github.com/bitfinexcom/bfx-hf-models-adapter-template">bfx-hf-models-adapter-template</a></p>
<p>For reference implementations (in-memory &amp; SQL) see:</p>
<ul>
<li><a href="https://github.com/bitfinexcom/bfx-hf-models-adapter-lowdb">bfx-hf-models-adapter-lowdb</a></li>
<li><a href="https://github.com/bitfinexcom/bfx-hf-models-adapter-sql">bfx-hf-models-adapter-sql</a></li>
</ul>
<p>It must provide methods for performing all database operations required for
a <a href="external:bfx-hf-models">external:bfx-hf-models</a> backend. Additional methods may be provided
and used, but the base set defined in this <strong>type</strong> are required.</p>
<p>For reference, a <strong>Map</strong> model is a set of records identified by a unique
key, and a <strong>Collection</strong> model is a set of records stored as an array
(key&#39;ed by index).</p>
</dd>
<dt><a href="#Model">Model</a> : <code>object</code></dt>
<dd><p>A <a href="external:bfx-hf-models">external:bfx-hf-models</a> model as defined by a path in the database,
name, type, schema, and any required data depending on the model type.</p>
</dd>
</dl>

<a name="module_bfx-hf-models"></a>

## bfx-hf-models
This module implements a backend-agnostic database system for the Bitfinex
Honey Framework. It is used by all HF repos for data storage, i.e:

* [bfx-hf-data-server](https://github.com/bitfinexcom/bfx-hf-data-server)
* [bfx-hf-algo-server](https://github.com/bitfinexcom/bfx-hf-algo-server)
* [bfx-hf-server](https://github.com/bitfinexcom/bfx-hf-server)

Both the DB backend and exchange-specific schema methods can be configured
upon initialization. There are currently two official exchange adapters:

* [bfx-hf-ext-plugin-bitfinex](https://github.com/bitfinexcom/bfx-hf-ext-plugin-bitfinex) - implements Bitfinex-specific
  model methods
* [bfx-hf-ext-plugin-dummy](https://github.com/bitfinexcom/bfx-hf-ext-plugin-dummy) - provides the base set of DB
  methods

Besides these, two DB backends are available:

* [bfx-hf-models-adapter-lowdb](https://github.com/bitfinexcom/bfx-hf-models-adapter-lowdb)
* [bfx-hf-models-adapter-sql](https://github.com/bitfinexcom/bfx-hf-models-adapter-sql) - uses knex internally,
  allowing flexibility in DB selection

For the required database adapter structure, see
[bfx-hf-models-adapter-template](https://github.com/bitfinexcom/bfx-hf-models-adapter-template)

**License**: Apache-2.0  
**Example**  
```js
const HFDB = require('bfx-hf-models')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: DummySchema } = require('bfx-hf-ext-plugin-dummy')

const db = new HFDB({
  schema: DummySchema,
  adapter: HFDBLowDBAdapter({
    dbPath: './db.json',
  })
})

// db is now ready to be used; see examples below
```
<a name="module_bfx-hf-models.DBAdapterCollectionMethods"></a>

### bfx-hf-models.DBAdapterCollectionMethods : <code>object</code>
A set of functions providing functionality for operating on **Collection**
models (records identified by index in an array). Additional methods may be
provided and will be made available on any **Collection** models, but those
listed here are required for a valid
[bfx-hf-models](#module_bfx-hf-models) database adapter.

**Kind**: static typedef of [<code>bfx-hf-models</code>](#module_bfx-hf-models)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| find | <code>module:bfx-hf-models.DBAdapterCollectionMethods~find</code> | record query function, returning an array of matches |
| rmAll | <code>module:bfx-hf-models.DBAdapterCollectionMethods~rmAll</code> | mass record delete function |
| getAll | <code>module:bfx-hf-models.DBAdapterCollectionMethods~getAll</code> | mass record query function; same as `find` but with no criteria |
| update | <code>module:bfx-hf-models.DBAdapterCollectionMethods~update</code> | record update function accepting an array of criteria; may update multiple   records at once |
| insert | <code>module:bfx-hf-models.DBAdapterCollectionMethods~insert</code> | record creation method |
| getInRange | <code>module:bfx-hf-models.DBAdapterCollectionMethods~getInRange</code> | high-level method to query records by criteria and a range of possible key   values, with optional sorting of results. |
| bulkInsert | <code>module:bfx-hf-models.DBAdapterCollectionMethods~bulkInsert</code> | similar to   [insert](module:bfx-hf-models.DBAdapterCollectionMethods~insert), but   meant for multiple records and intended to run as one database transaction   (should be more performant than individual `insert` calls, but   implementation is up to the adapter) |

<a name="HFDB"></a>

## HFDB
Database class, takes a storage adapter and database schema as constructor
options, then handles model persistence.

**Kind**: global class  

* [HFDB](#HFDB)
    * [new HFDB(args)](#new_HFDB_new)
    * [.close()](#HFDB+close)

<a name="new_HFDB_new"></a>

### new HFDB(args)
Create a new database instance. Models will be key'ed by name on the class
after initialization.

**Throws**:

- <code>Error</code> if given an invalid adapter (missing required method or
  having an otherwise invalid structure)


| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | arguments |
| args.adapter | [<code>DBAdapter</code>](#DBAdapter) | database adapter. See   [bfx-hf-models-adapter-sql](https://github.com/bitfinexcom/bfx-hf-models-adapter-sql) for an example, or the type   definition itself for a listing of required logic. |
| args.schema | <code>object</code> | database schema providing custom models on   top of the builtins. See [bfx-hf-ext-plugin-bitfinex](https://github.com/bitfinexcom/bfx-hf-ext-plugin-bitfinex) for   an example. |

**Example**  
```js
const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const { PSQL_CONNECTION } = process.env

const db = new HFDB({
  schema: HFDBBitfinexSchema,
  adapter: HFDBSQLAdapter({
    connection: PSQL_CONNECTION,
    clientType: 'pg'
  })
})

const { Trade } = db
const trades = await Trade.getAll()

trades.forEach(t => console.log(JSON.stringify(t, null, 2)))
```
<a name="HFDB+close"></a>

### hfdB.close()
Closes any DB connection; calls through to `close()` on the adapter, hence
behavior is dependent on the adapter used.

**Kind**: instance method of [<code>HFDB</code>](#HFDB)  
<a name="AlgoOrder"></a>

## AlgoOrder : [<code>Model</code>](#Model)
Algorithmic order model. Stores execution state.

**Kind**: global constant  
**Read only**: true  
<a name="Backtest"></a>

## Backtest : [<code>Model</code>](#Model)
Strategy backtest results model, includes backtest parameters and all trades
performed by the strategy.

**Kind**: global constant  
**Read only**: true  
<a name="Candle"></a>

## Candle : [<code>Model</code>](#Model)
OHLCV candle model

**Kind**: global constant  
**Read only**: true  
<a name="Credential"></a>

## Credential : [<code>Model</code>](#Model)
Model for storage of generic encrypted secrets. Used by
[bfx-hf-server](https://github.com/bitfinexcom/bfx-hf-server) and [bfx-hf-ui](https://github.com/bitfinexcom/bfx-hf-ui) for storing
encrypted API credentials.

**Kind**: global constant  
**Read only**: true  
<a name="Market"></a>

## Market : [<code>Model</code>](#Model)
Exchange market metadata, used by
[bfx-hf-server](https://github.com/bitfinexcom/bfx-hf-server) and [bfx-hf-ui](https://github.com/bitfinexcom/bfx-hf-ui) to track
available trading markets and their API names.

**Kind**: global constant  
**Read only**: true  
<a name="Strategy"></a>

## Strategy : [<code>Model</code>](#Model)
Strategy model, see [bfx-hf-strategy](https://github.com/bitfinexcom/bfx-hf-strategy) and
[bfx-hf-ui](https://github.com/bitfinexcom/bfx-hf-ui).

**Kind**: global constant  
**Read only**: true  
<a name="Trade"></a>

## Trade : [<code>Model</code>](#Model)
Public trade model

**Kind**: global constant  
**Read only**: true  
<a name="UserSettings"></a>

## UserSettings : [<code>Model</code>](#Model)
Map of per-user settings for the [bfx-hf-ui](https://github.com/bitfinexcom/bfx-hf-ui) trading
application.

**Kind**: global constant  
**Read only**: true  
<a name="DBAdapterCriteria"></a>

## DBAdapterCriteria : <code>Array</code>
An array containing 3 values; a field name, condition, and target value. For
example:

`['fieldA', '<', 1000]` - states that fieldA must be less than 1000

Used to run queries against the DB.

**Kind**: global typedef  
**See**: DBAdapterMapMethods~find  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | field name on record, value used as `lvalue` |
| 1 | <code>string</code> | condition, can be '=', '!=', '>', '>=', '<', or '<=' |
| 2 | <code>string</code> \| <code>number</code> | `rvalue` |

<a name="DBAdapterGenericMethods"></a>

## DBAdapterGenericMethods : <code>object</code>
A set of functions shared by both **Map** and **Collection** models.
Additional methods may be provided and will be made available on any models,
but those listed here are required for a valid
[external:bfx-hf-models](external:bfx-hf-models) database adapter.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| raw | [<code>raw</code>](#DBAdapterGenericMethods..raw) | raw database query method |

<a name="DBAdapterGenericMethods..raw"></a>

### DBAdapterGenericMethods~raw ⇒ <code>Promise</code>
Function providing access to the underlying database object for custom
queries.

**Kind**: inner typedef of [<code>DBAdapterGenericMethods</code>](#DBAdapterGenericMethods)  
**Returns**: <code>Promise</code> - p - as returned by the callback `cb`  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| cb | <code>function</code> | called with `(db, model)`, must return a promise |

<a name="DBAdapterMapMethods"></a>

## DBAdapterMapMethods : <code>object</code>
A set of functions providing functionality for operating on **Map** models
(records identified by a unique key). Additional methods may be provided and
will be made available on any **Map** models, but those listed here are
required for a valid [external:bfx-hf-models](external:bfx-hf-models) database adapter.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| create | [<code>create</code>](#DBAdapterMapMethods..create) | record creation method   (throws error if the record already exists) |
| update | [<code>update</code>](#DBAdapterMapMethods..update) | record update (full) method   (throws error if the record does not exist) |
| find | [<code>find</code>](#DBAdapterMapMethods..find) | record query method, accepting   an array of one or multiple criteria to be matched |
| getAll | [<code>getAll</code>](#DBAdapterMapMethods..getAll) | full collection query   method; must return a map of all records key'ed by `mapKey` as stored in   the DB. |
| get | [<code>get</code>](#DBAdapterMapMethods..get) | single record query method by ID   or record-like object containing ID. |
| set | [<code>set</code>](#DBAdapterMapMethods..set) | single record create/update method |
| rm | [<code>rm</code>](#DBAdapterMapMethods..rm) | single record removal method; throws   an error if the record does not exist |


* [DBAdapterMapMethods](#DBAdapterMapMethods) : <code>object</code>
    * [~create](#DBAdapterMapMethods..create) ⇒ <code>object</code>
    * [~find](#DBAdapterMapMethods..find) ⇒ <code>Array.&lt;object&gt;</code>
    * [~getAll](#DBAdapterMapMethods..getAll) ⇒ <code>object</code>
    * [~get](#DBAdapterMapMethods..get) ⇒ <code>object</code>
    * [~rm](#DBAdapterMapMethods..rm) : <code>function</code>
    * [~set](#DBAdapterMapMethods..set) ⇒ <code>object</code>
    * [~update](#DBAdapterMapMethods..update) ⇒ <code>number</code>

<a name="DBAdapterMapMethods..create"></a>

### DBAdapterMapMethods~create ⇒ <code>object</code>
Function that creates a **Map** model record in the database. Like all
database methods, it is provided the initialized **model** object, which as
per the spec provides a `mapKey` function argument which is defined on the
model itself, and used to generate the unique key.

To create **or** update a record if it already exists, see
[set](#DBAdapterMapMethods..set)

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Returns**: <code>object</code> - record - created record  
**Throws**:

- <code>Error</code> if a record already exists with the same key


| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| data | <code>object</code> | data to be saved as a new record |

<a name="DBAdapterMapMethods..find"></a>

### DBAdapterMapMethods~find ⇒ <code>Array.&lt;object&gt;</code>
Function that returns all records matching the provided criteria.

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Returns**: <code>Array.&lt;object&gt;</code> - records - array of records matching the provided
  criteria  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| criteria | [<code>Array.&lt;DBAdapterCriteria&gt;</code>](#DBAdapterCriteria) | array of   conditions to apply to records in the collection; the first record meeting   all conditions is returned as the "found" record. |

<a name="DBAdapterMapMethods..getAll"></a>

### DBAdapterMapMethods~getAll ⇒ <code>object</code>
Function that returns all records in a **Map** as an object, with records
key'ed by their map key.

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Returns**: <code>object</code> - records - map of all records, key'ed by `mapKey`  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |

<a name="DBAdapterMapMethods..get"></a>

### DBAdapterMapMethods~get ⇒ <code>object</code>
Function that returns a single record by ID. Also accepts a record-like
object containing at least the ID (i.e. `{ id: 42 }`)

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Returns**: <code>object</code> - record - matching record  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| docOrID | <code>object</code> \| <code>string</code> \| <code>number</code> | record to fetch or its ID |

<a name="DBAdapterMapMethods..rm"></a>

### DBAdapterMapMethods~rm : <code>function</code>
Function that deletes a single record by ID. Also accepts a record-like
object containing at least the ID (i.e. `{ id: 42 }`).

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Throws**:

- <code>Error</code> if the record does not exist


| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| docOrID | <code>object</code> \| <code>string</code> \| <code>number</code> | record to remove or its ID |

<a name="DBAdapterMapMethods..set"></a>

### DBAdapterMapMethods~set ⇒ <code>object</code>
Function that creates or updates a single record by ID. Also accepts a
record-like object containing at least the ID (i.e. `{ id: 42 }`).

To ensure existing records are not modified, use
[create](#DBAdapterMapMethods..create)

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Returns**: <code>object</code> - record - final record value as stored in the DB  

| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| value | <code>object</code> | record value, containing relevant data for key   generation. Any existing record with the same key will be overwritten. |

<a name="DBAdapterMapMethods..update"></a>

### DBAdapterMapMethods~update ⇒ <code>number</code>
Function that updates an existing **Map** model record in the database. Must
accept either the unique ID (key value) of the model to be updated, or the
model itself (containing the ID).

Must perform a full update. To create a record if it does not exist (or
update), use [module:bfx-hf-models.DBAdapterMapMethods~set](module:bfx-hf-models.DBAdapterMapMethods~set)

**Kind**: inner typedef of [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods)  
**Returns**: <code>number</code> - nUpdatedRows - number of updated rows  
**Throws**:

- <code>Error</code> fails if the record does not exist.


| Param | Type | Description |
| --- | --- | --- |
| db | <code>object</code> | database object as provided by adapter |
| model | [<code>Model</code>](#Model) | initialized model instance |
| docOrID | <code>object</code> \| <code>string</code> \| <code>number</code> | record to update or its ID |
| value | <code>object</code> | new data for the record |

<a name="DBAdapter"></a>

## DBAdapter : <code>object</code>
Database adapter structure for usage with [external:bfx-hf-models](external:bfx-hf-models).
For an example module refer to
[bfx-hf-models-adapter-template](https://github.com/bitfinexcom/bfx-hf-models-adapter-template)

For reference implementations (in-memory & SQL) see:
* [bfx-hf-models-adapter-lowdb](https://github.com/bitfinexcom/bfx-hf-models-adapter-lowdb)
* [bfx-hf-models-adapter-sql](https://github.com/bitfinexcom/bfx-hf-models-adapter-sql)

It must provide methods for performing all database operations required for
a [external:bfx-hf-models](external:bfx-hf-models) backend. Additional methods may be provided
and used, but the base set defined in this **type** are required.

For reference, a **Map** model is a set of records identified by a unique
key, and a **Collection** model is a set of records stored as an array
(key'ed by index).

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the adapter, i.e. 'Redis' or 'PSQL', etc |
| db | <code>object</code> | database object provided to all methods (i.e. DB   client, or in-memory DB reference, etc) |
| [dbInit] | <code>function</code> | if provided, this function is called to   and expected to provide the `db` object, overriding any provided on this   adapter. It is called with each model instance, post-initialization, and   then passed to the model for all DB-related methods. |
| [close] | <code>function</code> | if provided, this function is called when the   adapter is closed. Use this to clean up the database connection and flush   any unsaved changes. |
| mapMethods | [<code>DBAdapterMapMethods</code>](#DBAdapterMapMethods) | object of methods for operating on **Map** models (collections of records identified by unique key) |
| collectionMethods | <code>DBAdapterCollectionMethods</code> | object of methods   for operating on **Collection** models (identified by index) |
| genericMethods | [<code>DBAdapterGenericMethods</code>](#DBAdapterGenericMethods) | object of methods   shared by all model types. i.e. raw database query support. |

<a name="Model"></a>

## Model : <code>object</code>
A [external:bfx-hf-models](external:bfx-hf-models) model as defined by a path in the database,
name, type, schema, and any required data depending on the model type.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | location in database; final path depends on the   adapter used, with this property only needing to be unique. May be a table   name or key in an in-memory DB. |
| name | <code>string</code> | human readable model name |
| type | <code>string</code> | model type |
| schema | <code>object</code> | map of record key names to Javascript   primitive types, i.e. `{ gid: String }` |
| [mapKey] | <code>string</code> \| <code>function</code> | required for map models, either a   string with the key name or a function taking a model instance as the only   argument and returning the model's unique key. |
| [index] | <code>string</code> | name of key used as index for collections   instead of position in the collection. Meant to be used in conjunction   with `indexMatches` for updating documents in upserts. Only for   **collection** models. |
| [indexMatches] | <code>Array.&lt;string&gt;</code> | array of key names which must match   for two records to be considered the same in a collection. Used to update   documents in upserts. Only for **collection** models. |

