const _isFunction = require('lodash/isFunction')

module.exports = (gen, getter) => gen('update', ({ db, doc, key, args }) => {
  const [ cb ] = args

  // TODO: refactor? An error seems good here
  if (!_isFunction(cb)) {
    throw new Error('update modifier required')
  }

  db.update(key, cb).write()
  return getter(doc)
})
