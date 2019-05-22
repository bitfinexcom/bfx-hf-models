module.exports = gen => gen('get', ({ db, key }) => (
  db.get(key).value()
))
