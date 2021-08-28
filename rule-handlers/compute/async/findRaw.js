module.exports = async ({
  ruleArg: query,
  errorMessage,
  errorMessagesWrapper,
  options: { sequelize }
}) => {
  if (!sequelize) return
  try {
    const [result] = await sequelize.query(query)

    if (!result[0]) {
      return errorMessagesWrapper(errorMessage).emw2()
    }
  } catch (err) {
    console.log(err)
  }
}
