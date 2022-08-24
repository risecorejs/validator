"use strict";
module.exports = function (ctx) {
    if (typeof ctx.value !== 'number') {
        return ctx.errorMessage;
    }
};
