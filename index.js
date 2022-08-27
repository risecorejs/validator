"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const error_messages_1 = __importDefault(require("./error-messages"));
const rules_1 = __importDefault(require("./rules"));
/**
 * VALIDATOR
 * @param body {IFields}
 * @param rules {IRules}
 * @param options {IOptions}
 * @return {Promise<null | IFields>}
 */
async function default_1(body, rules, options) {
    const defaultLocale = 'en';
    options ||= {};
    options.locale ||= defaultLocale;
    options.sequelize ||= null;
    if (!error_messages_1.default.has(options.locale)) {
        console.log(`Locale [${options.locale}] not found. Default is [en]`);
        options.locale = defaultLocale;
    }
    const errorMessages = error_messages_1.default.get(options.locale);
    const errors = {};
    for (const formattedRulesRow of getFormattedRulesRows(rules)) {
        for (const rule of formattedRulesRow.rules) {
            const ruleContext = {
                body,
                rules,
                field: formattedRulesRow.field,
                value: body[formattedRulesRow.field],
                options
            };
            // IS-STRING
            if (typeof rule === 'string') {
                ruleContext.errorMessage = errorMessages[rule];
                const message = await executor(rule, ruleContext);
                if (message) {
                    if (message !== 'break') {
                        errors[formattedRulesRow.field] = message;
                    }
                    break;
                }
            }
            // IS-FUNCTION
            else if (typeof rule === 'function') {
                const result = await executor(rule, ruleContext);
                if (result) {
                    if (result !== 'break') {
                        errors[formattedRulesRow.field] = result;
                    }
                    break;
                }
            }
            // IS-OBJECT
            else if (rule.constructor === Object) {
                // @ts-ignore
                ruleContext.errorMessage = errorMessages[rule.name];
                ruleContext.argument = rule.argument;
                const message = await executor(rule.name, ruleContext);
                if (message) {
                    if (message !== 'break') {
                        errors[formattedRulesRow.field] = message;
                    }
                    break;
                }
            }
        }
    }
    return lodash_1.default.isEmpty(errors) ? null : errors;
}
exports.default = default_1;
/**
 * GET-FORMATTED-RULES-ROWS
 * @param rules {IRules}
 * @return {IFormattedRuleRow[]}
 */
function getFormattedRulesRows(rules) {
    const formattedRulesRows = [];
    for (const field in rules) {
        if (rules.hasOwnProperty(field) && !field.startsWith('$')) {
            const formattedRuleRow = {
                field,
                rules: []
            };
            const _rules = rules[field];
            // IS-STRING
            if (typeof _rules === 'string') {
                for (const rule of _rules.split('|')) {
                    if (rule.includes(':')) {
                        const [name, argument] = rule.split(':');
                        formattedRuleRow.rules.push({
                            name: name,
                            argument
                        });
                    }
                    else {
                        formattedRuleRow.rules.push(rule);
                    }
                }
            }
            // IS-FUNCTION
            else if (typeof _rules === 'function') {
                formattedRuleRow.rules.push(_rules);
            }
            // IS-ARRAY
            else if (Array.isArray(_rules)) {
                for (const __rules of _rules) {
                    // IS-STRING
                    if (typeof __rules === 'string') {
                        for (const rule of __rules.split('|')) {
                            if (rule.includes(':')) {
                                const [name, argument] = rule.split(':');
                                formattedRuleRow.rules.push({
                                    name: name,
                                    argument
                                });
                            }
                            else {
                                formattedRuleRow.rules.push(rule);
                            }
                        }
                    }
                    // IS-FUNCTION
                    else if (typeof __rules === 'function') {
                        formattedRuleRow.rules.push(__rules);
                    }
                    // IS-ARRAY
                    else if (Array.isArray(__rules)) {
                        const [ruleName, ruleArgument] = __rules;
                        formattedRuleRow.rules.push({
                            name: ruleName,
                            argument: ruleArgument
                        });
                    }
                }
            }
            // IS-OBJECT
            else if (_rules.constructor === Object) {
                rules['$' + field] = _rules;
                formattedRuleRow.rules.push('object');
            }
            formattedRulesRows.push(formattedRuleRow);
        }
    }
    return formattedRulesRows;
}
/**
 * EXECUTOR
 * @param ruleNameOrRuleHandler {TRuleNames | IRuleHandler}
 * @param ruleContext {IRuleContext}
 * @returns {TRuleHandler}
 */
function executor(ruleNameOrRuleHandler, ruleContext) {
    try {
        switch (typeof ruleNameOrRuleHandler) {
            case 'string': {
                if (rules_1.default.has(ruleNameOrRuleHandler)) {
                    return rules_1.default.get(ruleNameOrRuleHandler)(ruleContext);
                }
                else {
                    return `Rule [${ruleNameOrRuleHandler}] not found`;
                }
            }
            case 'function': {
                return ruleNameOrRuleHandler(ruleContext);
            }
        }
    }
    catch (err) {
        if (typeof err?.message === 'string') {
            return err.message;
        }
        else {
            return 'Unknown error';
        }
    }
}
