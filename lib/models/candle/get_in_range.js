module.exports = ({ getAll }) => ({ type, symbol, tf } = {}, { start, end }) => (
  getAll({
    type, symbol, tf
  }).filter(({ mts }) => mts >= start && mts <= end)
)
