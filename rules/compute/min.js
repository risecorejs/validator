"use strict";
module.exports = function (ctx) {
    if (!['string', 'number'].includes(typeof ctx.value) && !Array.isArray(ctx.value)) {
        return ctx.errorMessage.typeError;
    }
    if (!((typeof ctx.value === 'string' && ctx.value.length >= ctx.argument) ||
        (typeof ctx.value === 'number' && ctx.value >= ctx.argument) ||
        (Array.isArray(ctx.value) && ctx.value.length >= ctx.argument))) {
        return ctx.errorMessage.main(ctx.argument);
    }
};
