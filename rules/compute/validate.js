"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const index_1 = __importDefault(require("../../index"));
module.exports = async function (ctx) {
    const fields = Array.isArray(ctx.argument)
        ? ctx.argument
        : ctx.argument.split(',').map((field) => field.trim());
    const body = {};
    const rules = {};
    for (const field of fields) {
        body[field] = ctx.body[field];
        rules[field] = ctx.rules[field];
        for (const _field in ctx.rules) {
            if (ctx.rules.hasOwnProperty(_field) && _field.startsWith('$' + field)) {
                rules[_field] = ctx.rules[_field];
            }
        }
    }
    const errors = await (0, index_1.default)(body, rules, ctx.options);
    if (errors) {
        return errors;
    }
};
