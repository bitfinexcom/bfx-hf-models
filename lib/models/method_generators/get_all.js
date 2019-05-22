module.exports = gen => gen('get all', ({ db, path }) => (
  db.get(path).values().value()
))
