module.exports = async ({ options: { sequelize }, argument, value, errorMessage }) => {
  if (sequelize) {
    const [table, tableColumn] = Array.isArray(argument) ? argument : argument.split('-')

    const query = getQuery(sequelize.dialect.sequelize.options.dialect, table, tableColumn, value)

    const [result] = await sequelize.query(query)

    if (!result[0]) {
      return errorMessage(table)
    }
  }
}

/**
 * GET-QUERY
 * @param dialect {string}
 * @param table {string}
 * @param tableColumn {string}
 * @param value {any}
 * @return {string}
 */
function getQuery(dialect, table, tableColumn, value) {
  switch (dialect) {
    case 'mysql':
      return `SELECT \`${tableColumn}\` FROM \`${table}\` WHERE \`${tableColumn}\` = '${value}' LIMIT 1`

    case 'postgres':
      return `SELECT "${tableColumn}" FROM "${table}" WHERE "${tableColumn}" = '${value}' LIMIT 1`
  }
}
