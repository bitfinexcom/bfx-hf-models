const _isFunction = require('lodash/isFunction')

module.exports = gen => gen('find', ({ db, path }, filterCB) => {
  if (!_isFunction(filterCB)) {
    throw new Error('filter function required')
  }

  return db
    .get(path)
    .filter(filterCB)
    .values()
    .value()
})
