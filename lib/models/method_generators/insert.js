const binSearchInsert = require('binary-search-insert')
const SORT_TYPES = require('../../sort_types')

module.exports = gen => gen('insert', ({ db, doc, path, sort, args }) => {
  const [ index ] = args // ignored if sort enabled
  const allDocs = db.get(path).value()

  if (sort) {
    const { dir, key: sortKey } = sort
    const comp = dir === SORT_TYPES.ASC
      ? (a, b) => a[sortKey] - b[sortKey]
      : (a, b) => b[sortKey] - a[sortKey]

    binSearchInsert(allDocs, comp, doc)
  } else {
    allDocs.splice(index, 0, doc)
  }

  db.set(path, allDocs)

  return doc
})
