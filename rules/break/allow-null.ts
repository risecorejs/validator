import { IRuleContext } from '../../interfaces'

export = function (ctx: IRuleContext): string | void {
  if (ctx.value === null) {
    return 'break'
  }
}
