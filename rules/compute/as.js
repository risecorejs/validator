"use strict";
module.exports = function (ctx) {
    if (ctx.value !== ctx.body[ctx.argument]) {
        return ctx.errorMessage(ctx.field, ctx.argument);
    }
};
