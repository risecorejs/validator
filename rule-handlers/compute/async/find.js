module.exports = async ({
  ruleArg,
  requestValue,
  errorMessage,
  errorMessagesWrapper,
  options: { sequelize }
}) => {
  if (!sequelize) return

  try {
    errorMessage = errorMessagesWrapper(errorMessage).emw2()

    const [table, tableColumn] = ruleArg.split('-')

    const [result] = await sequelize.query(
      `SELECT * FROM ${table} WHERE ${tableColumn} = "${requestValue}"`
    )

    if (!result[0]) {
      return errorMessage(table)
    }
  } catch (err) {
    console.log(err)
  }
}
