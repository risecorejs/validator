"use strict";
const _ = require('lodash');
/**
 * GET-REQUIRED
 * @param ctx {IRuleContext}
 * @return {boolean}
 */
function getRequired(ctx) {
    const operators = {
        '>=': (left, right) => left >= right,
        '>': (left, right) => left > right,
        '<=': (left, right) => left <= right,
        '<': (left, right) => left < right,
        '!==': (left, right) => left !== right,
        '!=': (left, right) => left != right,
        '===': (left, right) => left === right,
        '==': (left, right) => left == right
    };
    for (const [operator, handler] of Object.entries(operators)) {
        if (ctx.argument.includes(operator)) {
            const [key, value] = ctx.argument.split(operator);
            return handler(ctx.body[key], eval(value));
        }
    }
}
module.exports = function (ctx) {
    const required = ctx.argument ? getRequired(ctx) : true;
    if (required) {
        if (typeof ctx.value === 'string') {
            ctx.value = ctx.value.trim();
        }
        if (ctx.value === void 0 ||
            ctx.value === null ||
            ctx.value.length === 0 ||
            (ctx.value.constructor === Object && _.isEmpty(ctx.value))) {
            return ctx.errorMessage;
        }
    }
};
