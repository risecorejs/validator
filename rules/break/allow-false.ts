import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if (ctx.value === false) {
    return 'break'
  }
}
