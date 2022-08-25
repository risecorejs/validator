import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  if (
    typeof ctx.value !== 'string' ||
    ctx.value.trim() === '' ||
    !ctx.value.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    return <string>ctx.errorMessage
  }
}
