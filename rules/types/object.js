"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("../../index"));
module.exports = async function (ctx) {
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
};
