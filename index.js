const _ = require('lodash')

const ruleConfig = require('./rules/config.json')

/**
 * VALIDATOR
 * @param body {Object}
 * @param rawRules {Object}
 * @param options {Object?}
 * @returns {Promise<null|Object>}
 */
module.exports = async (body, rawRules, options) => {
  options ||= {}
  options.locale ||= 'en'
  options.sequelize ||= null

  const errorMessages = require('./error-messages/' + options.locale)

  const errors = {}

  for (const { field, rules } of getFormattedRules(rawRules)) {
    for (const rule of rules) {
      const ruleOptions = {
        body,
        rawRules,
        field,
        value: body[field],
        options
      }

      if (typeof rule === 'string') {
        ruleOptions.errorMessage = errorMessages[rule]

        const result = await executor(rule, ruleOptions)

        if (result) {
          if (result !== 'break') {
            errors[field] = result
          }

          break
        }
      } else if (typeof rule === 'function') {
        const result = await rule(ruleOptions)

        if (result) {
          if (result !== 'break') {
            errors[field] = result
          }

          break
        }
      } else if (rule.constructor === Object) {
        ruleOptions.errorMessage = errorMessages[rule.name]
        ruleOptions.argument = rule.argument

        const result = await executor(rule.name, ruleOptions)

        if (result) {
          if (result !== 'break') {
            errors[field] = result
          }

          break
        }
      }
    }
  }

  return _.isEmpty(errors) ? null : errors
}

/**
 * EXECUTOR
 * @param ruleName
 * @param options
 * @returns {Promise<*>}
 */
async function executor(ruleName, options) {
  try {
    const handler = require('./rules/' + ruleConfig[ruleName])

    return await handler(options)
  } catch (err) {
    console.error(err)
  }
}

/**
 * GET-FORMATTED-RULES
 * @param rawRules {Object}
 * @returns {any[]}
 */
function getFormattedRules(rawRules) {
  const formattedRules = []

  for (const field in rawRules) {
    if (rawRules.hasOwnProperty(field) && !field.startsWith('$')) {
      const formattedRule = {
        field,
        rules: []
      }

      if (typeof rawRules[field] === 'string') {
        for (const rawRule of rawRules[field].split('|')) {
          if (rawRule.includes(':')) {
            const [ruleName, ruleArgument] = rawRule.split(':')

            formattedRule.rules.push({
              name: ruleName,
              argument: ruleArgument
            })
          } else {
            formattedRule.rules.push(rawRule)
          }
        }
      } else if (typeof rawRules[field] === 'function') {
        formattedRule.rules.push(rawRules[field])
      } else if (Array.isArray(rawRules[field])) {
        for (const rawRule of rawRules[field]) {
          if (typeof rawRule === 'string') {
            for (const _rawRule of rawRule.split('|')) {
              if (_rawRule.includes(':')) {
                const [ruleName, ruleArgument] = _rawRule.split(':')

                formattedRule.rules.push({
                  name: ruleName,
                  argument: ruleArgument
                })
              } else {
                formattedRule.rules.push(_rawRule)
              }
            }
          } else if (typeof rawRule === 'function') {
            formattedRule.rules.push(rawRule)
          } else if (Array.isArray(rawRule)) {
            const [ruleName, ruleArgument] = rawRule

            formattedRule.rules.push({
              name: ruleName,
              argument: ruleArgument
            })
          }
        }
      } else if (rawRules[field].constructor === Object) {
        rawRules['$' + field] = rawRules[field]

        formattedRule.rules.push('object')
      }

      formattedRules.push(formattedRule)
    }
  }

  return formattedRules
}
