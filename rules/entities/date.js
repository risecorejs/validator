"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const moment_1 = __importDefault(require("moment"));
module.exports = function (ctx) {
    if (!(0, moment_1.default)(ctx.value, ctx.argument || true).isValid()) {
        return ctx.errorMessage;
    }
};
