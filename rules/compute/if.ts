import { IRuleContext } from '../../interfaces'

export = function (ctx: IRuleContext): string | void {
  const operators = {
    '>=': (left: any, right: any): boolean => left >= right,
    '>': (left: any, right: any): boolean => left > right,

    '<=': (left: any, right: any): boolean => left <= right,
    '<': (left: any, right: any): boolean => left < right,

    '!==': (left: any, right: any): boolean => left !== right,
    '!=': (left: any, right: any): boolean => left != right,

    '===': (left: any, right: any): boolean => left === right,
    '==': (left: any, right: any): boolean => left == right
  }

  for (const [operator, handler] of Object.entries(operators)) {
    if (ctx.argument.includes(operator)) {
      const [key, value] = ctx.argument.split(operator)

      const result = handler(ctx.body[key], eval(value))

      if (!result) {
        return 'break'
      }

      break
    }
  }
}
