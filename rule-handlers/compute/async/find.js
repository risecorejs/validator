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

    const dialect = sequelize.dialect.sequelize.options.dialect

    let query = null

    switch (dialect) {
      case 'mysql':
        query = `SELECT \`${tableColumn}\` FROM \`${table}\` WHERE \`${tableColumn}\` = '${requestValue}' LIMIT 1`
        break
      case 'postgres':
        query = `SELECT "${tableColumn}" FROM "${table}" WHERE "${tableColumn}" = '${requestValue}' LIMIT 1`
        break
      default:
        break
    }

    const [result] = await sequelize.query(query)

    if (!result[0]) {
      return errorMessage(table)
    }
  } catch (err) {
    console.log(err)
  }
}
