const lpn = require('libphonenumber-js')

import { IRuleContext } from '../../interfaces'

export = function (ctx: IRuleContext): string | void {
  if (typeof ctx.value !== 'string') {
    return <string>ctx.errorMessage.typeError
  }

  const tel = lpn(ctx.value)

  if (tel === void 0 || !tel.isValid() || ctx.value.match(/[A-ZА-Я]/i)) {
    return <string>ctx.errorMessage.main
  }

  if (ctx.argument && tel.country !== ctx.argument) {
    return <string>ctx.errorMessage.countryCode
  }
}
