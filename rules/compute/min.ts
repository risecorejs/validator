import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if (!['string', 'number'].includes(typeof ctx.value) && !Array.isArray(ctx.value)) {
    return <string>ctx.errorMessage.typeError
  }

  if (
    !(
      (typeof ctx.value === 'string' && ctx.value.length >= ctx.argument) ||
      (typeof ctx.value === 'number' && ctx.value >= ctx.argument) ||
      (Array.isArray(ctx.value) && ctx.value.length >= ctx.argument)
    )
  ) {
    return <string>ctx.errorMessage.main(ctx.argument)
  }
}
