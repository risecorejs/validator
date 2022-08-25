"use strict";
module.exports = function (ctx) {
    const values = Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split(',').map((value) => eval(value));
    if (!values.includes(ctx.value)) {
        return ctx.errorMessage(values);
    }
};
