"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const _ = require('lodash');
const index_1 = __importDefault(require("../../index"));
module.exports = async function (ctx) {
    if (!Array.isArray(ctx.value)) {
        return ctx.errorMessage.main;
    }
    if (ctx.argument) {
        if (!['boolean', 'number', 'object', 'string'].includes(ctx.argument)) {
            return ctx.errorMessage.typeNotSupported;
        }
        const errors = {};
        for (const [index, item] of ctx.value.entries()) {
            if ((ctx.argument === 'object' && item.constructor !== Object) ||
                (typeof item !== ctx.argument && ctx.argument !== 'object')) {
                errors[index] = ctx.errorMessage.expectedType(ctx.argument);
                continue;
            }
            const rules = ctx.rules['$' + ctx.field];
            if (rules) {
                const itemIsObject = item.constructor === Object;
                const body = itemIsObject ? item : { data: item };
                const _rules = itemIsObject ? rules : { data: rules };
                const _errors = await (0, index_1.default)(body, _rules, ctx.options);
                if (_errors) {
                    errors[index] = itemIsObject ? _errors : _errors.data;
                }
            }
        }
        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
};
