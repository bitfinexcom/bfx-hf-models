const genModelMethod = require('./gen_model_method')

module.exports = ({ name, path, key, sort, db } = {}) =>
  (...funcArgs) => (
    genModelMethod({ name, path, key, db, sort, funcArgs })
  )
