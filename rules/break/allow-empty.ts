import { IRuleContext } from '../../interfaces'

export = function (ctx: IRuleContext): string | void {
  if (ctx.value?.length === 0 || (ctx.value?.constructor === Object && Object.keys(ctx.value).length === 0)) {
    return 'break'
  }
}
