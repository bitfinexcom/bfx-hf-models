module.exports = (gen, getter) => gen('set', ({ db, doc, key }) => {
  db.set(key, doc).write()
  return getter(doc)
})
