import _ from 'lodash'

import { IErrorMessages, IFields, IFormattedRuleRow, IOptions, IRules, IRuleContext } from './interfaces'
import { TRuleHandler, TRuleNames, TRuleNamesWithErrorMessage } from './types'

import rulesConfig from './rules/config.json'

export = main

/**
 * VALIDATOR
 * @param body {IFields}
 * @param rules {IRules}
 * @param options {IOptions}
 * @return {Promise<null | IFields>}
 */
async function main(body: IFields, rules: IRules, options?: IOptions): Promise<null | IFields> {
  options ||= {}
  options.locale ||= 'en'
  options.sequelize ||= null

  const errorMessages: IErrorMessages = require('./error-messages/' + options.locale)

  const errors: IFields = {}

  for (const formattedRulesRow of getFormattedRulesRows(rules)) {
    for (const rule of formattedRulesRow.rules) {
      const ruleContext: IRuleContext = {
        body,
        rules,
        field: formattedRulesRow.field,
        value: body[formattedRulesRow.field],
        options
      }

      // IS-STRING
      if (typeof rule === 'string') {
        ruleContext.errorMessage = errorMessages[rule]

        const message = await executor(rule, ruleContext)

        if (message) {
          if (message !== 'break') {
            errors[formattedRulesRow.field] = message
          }

          break
        }
      }

      // IS-FUNCTION
      else if (typeof rule === 'function') {
        const result = await rule(ruleContext)

        if (result) {
          if (result !== 'break') {
            errors[formattedRulesRow.field] = result
          }

          break
        }
      }

      // IS-OBJECT
      else if (rule.constructor === Object) {
        ruleContext.errorMessage = errorMessages[rule.name]
        ruleContext.argument = rule.argument

        const message = await executor(rule.name, ruleContext)

        if (message) {
          if (message !== 'break') {
            errors[formattedRulesRow.field] = message
          }

          break
        }
      }
    }
  }

  return _.isEmpty(errors) ? null : errors
}

/**
 * GET-FORMATTED-RULES-ROWS
 * @param rules {IRules}
 * @return {IFormattedRuleRow[]}
 */
function getFormattedRulesRows(rules: IRules): IFormattedRuleRow[] {
  const formattedRulesRows: IFormattedRuleRow[] = []

  for (const field in rules) {
    if (rules.hasOwnProperty(field) && !field.startsWith('$')) {
      const formattedRuleRow: IFormattedRuleRow = {
        field,
        rules: []
      }

      const _rules = rules[field]

      // IS-STRING
      if (typeof _rules === 'string') {
        for (const rule of _rules.split('|')) {
          if (rule.includes(':')) {
            const [name, argument] = rule.split(':')

            formattedRuleRow.rules.push({
              name: <TRuleNamesWithErrorMessage>name,
              argument
            })
          } else {
            formattedRuleRow.rules.push(<TRuleNamesWithErrorMessage>rule)
          }
        }
      }

      // IS-FUNCTION
      else if (typeof _rules === 'function') {
        formattedRuleRow.rules.push(_rules)
      }

      // IS-ARRAY
      else if (Array.isArray(_rules)) {
        for (const __rules of _rules) {
          // IS-STRING
          if (typeof __rules === 'string') {
            for (const rule of __rules.split('|')) {
              if (rule.includes(':')) {
                const [name, argument] = rule.split(':')

                formattedRuleRow.rules.push({
                  name: <TRuleNamesWithErrorMessage>name,
                  argument
                })
              } else {
                formattedRuleRow.rules.push(<TRuleNamesWithErrorMessage>rule)
              }
            }
          }

          // IS-FUNCTION
          else if (typeof __rules === 'function') {
            formattedRuleRow.rules.push(__rules)
          }

          // IS-ARRAY
          else if (Array.isArray(__rules)) {
            const [ruleName, ruleArgument] = __rules

            formattedRuleRow.rules.push({
              name: <TRuleNamesWithErrorMessage>ruleName,
              argument: ruleArgument
            })
          }
        }
      }

      // IS-OBJECT
      else if (_rules.constructor === Object) {
        rules['$' + field] = _rules

        formattedRuleRow.rules.push('object')
      }

      formattedRulesRows.push(formattedRuleRow)
    }
  }

  return formattedRulesRows
}

/**
 * EXECUTOR
 * @param ruleName {TRuleNames}
 * @param ruleContext {IRuleContext}
 * @returns {Promise<any> | string}
 */
function executor(ruleName: TRuleNames, ruleContext: IRuleContext): Promise<any> | string {
  try {
    const ruleHandler = <TRuleHandler>require('./rules/' + rulesConfig[ruleName])

    return ruleHandler(ruleContext)
  } catch (err) {
    console.error(err)

    return err.message
  }
}
