import { IRuleContext } from '../../interfaces'

export default function (ctx: IRuleContext): string | void {
  const values = Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split(',').map((value: any) => eval(value))

  if (!values.includes(ctx.value)) {
    return <string>ctx.errorMessage(values)
  }
}
