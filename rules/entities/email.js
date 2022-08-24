"use strict";
module.exports = function (ctx) {
    if (typeof ctx.value !== 'string' ||
        ctx.value.trim() === '' ||
        !ctx.value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
        return ctx.errorMessage;
    }
};
