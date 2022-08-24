"use strict";
module.exports = function (ctx) {
    if ((ctx.argument && ctx.body[ctx.argument] === void 0) || (!ctx.argument && ctx.value === void 0)) {
        return 'break';
    }
};
