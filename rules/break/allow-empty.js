"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    if (ctx.value?.length === 0 || (ctx.value?.constructor === Object && Object.keys(ctx.value).length === 0)) {
        return 'break';
    }
}
exports.default = default_1;
