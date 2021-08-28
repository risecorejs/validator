module.exports = async ({
  ruleArg,
  requestKey,
  requestValue,
  errorMessage,
  errorMessagesWrapper,
  options: { sequelize }
}) => {
  if (sequelize) {
    const [table, tableColumn] = ruleArg.split('-')

    try {
      const [result] = await sequelize.query(
        `SELECT * FROM ${table} WHERE ${
          tableColumn ? tableColumn : requestKey
        } = "${requestValue}"`
      )

      if (result[0]) {
        return errorMessagesWrapper(errorMessage).emw2()
      }
    } catch (err) {
      console.log(err)
    }
  }
}
