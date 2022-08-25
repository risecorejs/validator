import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if (ctx.value !== ctx.body[ctx.argument]) {
    return <string>ctx.errorMessage(ctx.field, ctx.argument)
  }
}
