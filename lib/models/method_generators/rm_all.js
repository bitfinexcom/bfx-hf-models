const _isObject = require('lodash/isObject')

// for collections; TODO: clarify on all model method gens
module.exports = (gen, getter) => gen('remove all', ({ db, path }) => {
  const collection = db.get(path).value()

  db.set(path, []).write()

  return collection
})
