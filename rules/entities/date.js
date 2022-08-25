"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function default_1(ctx) {
    if (!(0, moment_1.default)(ctx.value, ctx.argument || true).isValid()) {
        return ctx.errorMessage;
    }
}
exports.default = default_1;
