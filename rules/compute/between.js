"use strict";
module.exports = function (ctx) {
    const [leftNum, rightNum] = Array.isArray(ctx.argument) ? ctx.argument : ctx.argument.split('-');
    if (!['string', 'number'].includes(typeof ctx.value) && !Array.isArray(ctx.value)) {
        return ctx.errorMessage.typeError;
    }
    if (!((typeof ctx.value === 'string' && ctx.value.length <= rightNum) ||
        (typeof ctx.value === 'number' && ctx.value <= rightNum) ||
        (Array.isArray(ctx.value) && ctx.value.length <= rightNum))) {
        return ctx.errorMessage.max(rightNum);
    }
    if (!((typeof ctx.value === 'string' && ctx.value.length >= leftNum) ||
        (typeof ctx.value === 'number' && ctx.value >= leftNum) ||
        (Array.isArray(ctx.value) && ctx.value.length >= leftNum))) {
        return ctx.errorMessage.min(leftNum);
    }
};
