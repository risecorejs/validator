import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if ((ctx.argument && ctx.body[ctx.argument] === void 0) || (!ctx.argument && ctx.value === void 0)) {
    return 'break'
  }
}
