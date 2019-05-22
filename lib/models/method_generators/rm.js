const _isObject = require('lodash/isObject')

module.exports = (gen, getter) => gen('remove', ({ db, doc, key }) => {
  const existingDoc = getter(doc)

  if (_isObject(existingDoc)) {
    db.unset(key).write()
  }

  return existingDoc
})
