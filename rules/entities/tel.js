"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lpn = require('libphonenumber-js');
function default_1(ctx) {
    if (typeof ctx.value !== 'string') {
        return ctx.errorMessage.typeError;
    }
    const tel = lpn(ctx.value);
    if (tel === void 0 || !tel.isValid() || ctx.value.match(/[A-ZА-Я]/i)) {
        return ctx.errorMessage.main;
    }
    if (ctx.argument && tel.country !== ctx.argument) {
        return ctx.errorMessage.countryCode;
    }
}
exports.default = default_1;
