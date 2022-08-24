"use strict";
module.exports = function (ctx) {
    if (typeof ctx.value !== 'string') {
        return ctx.errorMessage;
    }
};
