import { IRuleContext } from '../../../interfaces'
import { TDialects } from '../../../types/index'

export = async function (ctx: IRuleContext): Promise<string | void> {
  if (ctx.options.sequelize) {
    const [table, column] = <[string, string]>(Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split('-'))

    const query = getQuery(<TDialects>ctx.options.sequelize.getDialect(), table, column, ctx.value)

    const [result] = await ctx.options.sequelize.query(query)

    if (!result[0]) {
      return <string>ctx.errorMessage(table)
    }
  }
}

/**
 * GET-QUERY
 * @param dialect {TDialects}
 * @param table {string}
 * @param column {string}
 * @param value {any}
 * @return {string}
 */
function getQuery(dialect: TDialects, table: string, column: string, value: any): string {
  switch (dialect) {
    case 'mysql':
      return `SELECT \`${column}\` FROM \`${table}\` WHERE \`${column}\` = '${value}' LIMIT 1`

    case 'postgres':
      return `SELECT "${column}" FROM "${table}" WHERE "${column}" = '${value}' LIMIT 1`
  }
}
