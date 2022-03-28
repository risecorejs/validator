module.exports = async ({ options: { sequelize }, argument: query, errorMessage }) => {
  if (sequelize) {
    const [result] = await sequelize.query(query)

    if (!result[0]) {
      return errorMessage
    }
  }
}
