module.exports = (gen, getter) => gen('create', ({ db, name, doc, key }) => {
  // TODO: Error ok here?
  if (getter(doc)) {
    throw new Error(`[${name}] ${key} already exists, cannot create`)
  }

  db.set(key, doc).write()

  return getter(doc)
})
