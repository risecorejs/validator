"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    if ((ctx.argument && ctx.body[ctx.argument] === void 0) || (!ctx.argument && ctx.value === void 0)) {
        return 'break';
    }
}
exports.default = default_1;
