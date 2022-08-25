import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if (ctx.value.length !== +ctx.argument) {
    return <string>ctx.errorMessage(ctx.argument)
  }
}
