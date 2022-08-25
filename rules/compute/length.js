"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    if (ctx.value.length !== +ctx.argument) {
        return ctx.errorMessage(ctx.argument);
    }
}
exports.default = default_1;
