import { IFields, IRuleContext, IRules } from '../../interfaces'

import validator from '../../index'

export = async function (ctx: IRuleContext): Promise<string | IFields | void> {
  const fields = Array.isArray(ctx.argument)
    ? ctx.argument
    : ctx.argument.split(',').map((field: string) => field.trim())

  const body: IFields = {}
  const rules: IRules = {}

  for (const field of fields) {
    body[field] = ctx.body[field]
    rules[field] = ctx.rules[field]

    for (const _field in ctx.rules) {
      if (ctx.rules.hasOwnProperty(_field) && _field.startsWith('$' + field)) {
        rules[_field] = ctx.rules[_field]
      }
    }
  }

  const errors = await validator(body, rules, ctx.options)

  if (errors) {
    return errors
  }
}
