import { IRuleContext } from '../../interfaces'

const _ = require('lodash')

export = function (ctx: IRuleContext): string | void {
  const required = ctx.argument ? getRequired(ctx) : true

  if (required) {
    if (typeof ctx.value === 'string') {
      ctx.value = ctx.value.trim()
    }

    if (
      ctx.value === void 0 ||
      ctx.value === null ||
      ctx.value.length === 0 ||
      (ctx.value.constructor === Object && _.isEmpty(ctx.value))
    ) {
      return <string>ctx.errorMessage
    }
  }
}

/**
 * GET-REQUIRED
 * @param ctx {IRuleContext}
 * @return {boolean}
 */
function getRequired(ctx: IRuleContext) {
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

      return handler(ctx.body[key], eval(value))
    }
  }
}
