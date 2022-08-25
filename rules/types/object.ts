import { IFields, IRuleContext, IRules } from '../../interfaces'

import validator from '../../index'

export default async function (ctx: IRuleContext): Promise<string | IFields | void> {
  if (ctx.value?.constructor !== Object) {
    return <string>ctx.errorMessage
  }

  const body: IFields = ctx.value
  const rules: IRules = <IRules>ctx.rules['$' + ctx.field]

  if (rules) {
    const errors = await validator(body, rules, ctx.options)

    if (errors) {
      return errors
    }
  }
}
