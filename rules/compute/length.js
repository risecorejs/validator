"use strict";
module.exports = function (ctx) {
    if (ctx.value.length !== +ctx.argument) {
        return ctx.errorMessage(ctx.argument);
    }
};
