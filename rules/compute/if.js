"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
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
            const result = handler(ctx.body[key], eval(value));
            if (!result) {
                return 'break';
            }
            break;
        }
    }
}
exports.default = default_1;
