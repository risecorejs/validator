"use strict";
module.exports = function (ctx) {
    if (typeof ctx.value !== 'boolean') {
        return ctx.errorMessage;
    }
};
