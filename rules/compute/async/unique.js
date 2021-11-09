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

    const dialect = sequelize.dialect.sequelize.options.dialect

    let query = null

    const column = tableColumn ? tableColumn : requestKey

    switch (dialect) {
      case 'mysql':
        query = `SELECT \`${column}\` FROM \`${table}\` WHERE \`${column}\` = '${requestValue}' LIMIT 1`
        break
      case 'postgres':
        query = `SELECT "${column}" FROM "${table}" WHERE "${column}" = '${requestValue}' LIMIT 1`
        break
      default:
        break
    }

    try {
      const [result] = await sequelize.query(query)

      if (result[0]) {
        return errorMessagesWrapper(errorMessage).emw2()
      }
    } catch (err) {
      console.log(err)
    }
  }
}
