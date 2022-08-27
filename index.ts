import _ from 'lodash'

import { IErrorMessages, IFields, IFormattedRuleRow, IOptions, IRules, IRuleContext, IRuleHandler } from './interfaces'
import { TRuleHandler, TRuleNames } from './types'

import errorMessagesByLocale from './error-messages'
import ruleHandlersByName from './rules'

/**
 * VALIDATOR
 * @param body {IFields}
 * @param rules {IRules}
 * @param options {IOptions}
 * @return {Promise<null | IFields>}
 */
export default async function (body: IFields, rules: IRules, options?: IOptions): Promise<null | IFields> {
  const defaultLocale = 'en'

  options ||= {}
  options.locale ||= defaultLocale
  options.sequelize ||= null

  if (!errorMessagesByLocale.has(options.locale)) {
    console.log(`Locale [${options.locale}] not found. Default is [en]`)

    options.locale = defaultLocale
  }

  const errorMessages: IErrorMessages = <IErrorMessages>errorMessagesByLocale.get(options.locale)

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
        const result = await executor(rule, ruleContext)

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
              name: <TRuleNames>name,
              argument
            })
          } else {
            formattedRuleRow.rules.push(<TRuleNames>rule)
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
                  name: <TRuleNames>name,
                  argument
                })
              } else {
                formattedRuleRow.rules.push(<TRuleNames>rule)
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
              name: <TRuleNames>ruleName,
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
 * @param ruleNameOrRuleHandler {TRuleNames | IRuleHandler}
 * @param ruleContext {IRuleContext}
 * @returns {TRuleHandler}
 */
function executor(ruleNameOrRuleHandler: TRuleNames | IRuleHandler, ruleContext: IRuleContext): TRuleHandler {
  try {
    switch (typeof ruleNameOrRuleHandler) {
      case 'string': {
        if (ruleHandlersByName.has(ruleNameOrRuleHandler)) {
          return (<IRuleHandler>ruleHandlersByName.get(ruleNameOrRuleHandler))(ruleContext)
        } else {
          return `Rule [${ruleNameOrRuleHandler}] not found`
        }
      }

      case 'function': {
        return ruleNameOrRuleHandler(ruleContext)
      }
    }
  } catch (err) {
    if (typeof err?.message === 'string') {
      return err.message
    } else {
      return 'Unknown error'
    }
  }
}
