"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../index"));
async function default_1(ctx) {
    if (ctx.value?.constructor !== Object) {
        return ctx.errorMessage;
    }
    const body = ctx.value;
    const rules = ctx.rules['$' + ctx.field];
    if (rules) {
        const errors = await (0, index_1.default)(body, rules, ctx.options);
        if (errors) {
            return errors;
        }
    }
}
exports.default = default_1;
