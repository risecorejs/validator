import { IRuleContext } from '../../interfaces'

export = function (ctx: IRuleContext): string | void {
  if (typeof ctx.value !== 'number') {
    return <string>ctx.errorMessage
  }
}
