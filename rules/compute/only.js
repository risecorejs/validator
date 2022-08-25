"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    const values = Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split(',').map((value) => eval(value));
    if (!values.includes(ctx.value)) {
        return ctx.errorMessage(values);
    }
}
exports.default = default_1;
