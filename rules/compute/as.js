"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    if (ctx.value !== ctx.body[ctx.argument]) {
        return ctx.errorMessage(ctx.field, ctx.argument);
    }
}
exports.default = default_1;
