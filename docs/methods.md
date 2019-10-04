### Available Methods
Note that all methods return promises.

#### Collections
* `find(criteria = [])` - query documents by a set of criteria, resolves to matches
* `getAll()` - resolves to all documents in the collection
* `getInRange(criteria = [], range = { key, start, end })` - resolves to all documents matching the criteria & specified range
* `insert(document = {})` - inserts the document into the collection and resolves with it
* `bulkInsert(documents = [])` - inserts multiple documents into the collection and resolves to them
* `rmAll()` - removes all documents from the collection
* `update(criteria = [], data = {})` - updates all documents matching the criteria with the provided data
* `upsert(document = {})` - inserts or updates a document if it already exists
* `raw(cb)` - calls the callback with the model instance

#### Maps
* `get(documentOrID = {})` - query a document by ID or object containing ID
* `getAll()` - query all documents in the map
* `set(document = {})` - create/update a document
* `create(document = {})` - create a document, rejects if it already exists
* `update(documentOrID = {}, data = {})` - update a document in place with the provided data
* `rm(documentOrID = {})` - remove a document by ID or object containing ID
* `find(criteria = [])` - returns an array of documents matching the criteria
* `raw(cb)` - calls the callback with the model instance

