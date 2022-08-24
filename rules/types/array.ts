const _ = require('lodash')

import validator from '../../index'

import { IFields, IRuleContext, IRules } from '../../interfaces'

export = async function (ctx: IRuleContext): Promise<string | IFields | void> {
  if (!Array.isArray(ctx.value)) {
    return <string>ctx.errorMessage.main
  }

  if (ctx.argument) {
    if (!['boolean', 'number', 'object', 'string'].includes(ctx.argument)) {
      return <string>ctx.errorMessage.typeNotSupported
    }

    const errors: IFields = {}

    for (const [index, item] of ctx.value.entries()) {
      if (
        (ctx.argument === 'object' && item.constructor !== Object) ||
        (typeof item !== ctx.argument && ctx.argument !== 'object')
      ) {
        errors[index] = <string>ctx.errorMessage.expectedType(ctx.argument)

        continue
      }

      const rules: IRules = <IRules>ctx.rules['$' + ctx.field]

      if (rules) {
        const itemIsObject: boolean = item.constructor === Object

        const body: IFields = itemIsObject ? item : { data: item }
        const _rules: IRules = itemIsObject ? rules : { data: rules }

        const _errors = await validator(body, _rules, ctx.options)

        if (_errors) {
          errors[index] = itemIsObject ? _errors : _errors.data
        }
      }
    }

    if (!_.isEmpty(errors)) {
      return errors
    }
  }
}
