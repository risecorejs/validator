import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if (typeof ctx.value !== 'boolean') {
    return <string>ctx.errorMessage
  }
}
