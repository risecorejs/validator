"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(ctx) {
    if (typeof ctx.value !== 'string' ||
        ctx.value.trim() === '' ||
        !ctx.value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
        return ctx.errorMessage;
    }
}
exports.default = default_1;
