import moment from 'moment'

import { IRuleContext } from '../../interfaces'

export = function (ctx: IRuleContext): string | void {
  if (!moment(ctx.value, ctx.argument || true).isValid()) {
    return <string>ctx.errorMessage
  }
}
