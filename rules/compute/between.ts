import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  const [leftNum, rightNum] = Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split('-')

  if (!['string', 'number'].includes(typeof ctx.value) && !Array.isArray(ctx.value)) {
    return <string>ctx.errorMessage.typeError
  }

  if (
    !(
      (typeof ctx.value === 'string' && ctx.value.length <= rightNum) ||
      (typeof ctx.value === 'number' && ctx.value <= rightNum) ||
      (Array.isArray(ctx.value) && ctx.value.length <= rightNum)
    )
  ) {
    return <string>ctx.errorMessage.max(rightNum)
  }

  if (
    !(
      (typeof ctx.value === 'string' && ctx.value.length >= leftNum) ||
      (typeof ctx.value === 'number' && ctx.value >= leftNum) ||
      (Array.isArray(ctx.value) && ctx.value.length >= leftNum)
    )
  ) {
    return <string>ctx.errorMessage.min(leftNum)
  }
}
