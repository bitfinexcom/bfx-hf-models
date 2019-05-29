module.exports = ({ getAll }) => ({ symbol } = {}, { start, end }) => (
  getAll({ symbol }).filter(({ mts }) => mts >= start && mts <= end)
)
