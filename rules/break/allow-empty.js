"use strict";
module.exports = function (ctx) {
    if (ctx.value?.length === 0 || (ctx.value?.constructor === Object && Object.keys(ctx.value).length === 0)) {
        return 'break';
    }
};
