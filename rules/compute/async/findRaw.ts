import { IRuleContext } from '../../../interfaces'

export = async function (ctx: IRuleContext): Promise<string | void> {
  if (ctx.options.sequelize) {
    const [result] = await ctx.options.sequelize.query(ctx.argument)

    if (!result[0]) {
      return <string>ctx.errorMessage
    }
  }
}
