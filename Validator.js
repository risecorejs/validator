const _ = require('lodash')

const config = require('./rules/config')
const errorMessagesWrapper = require('./rules/error-messages-wrapper')

/**
 * VALIDATOR
 * @param request {Object}
 * @param rules {Object}
 * @param options {Object?}
 */
module.exports = class Validator {
  #request
  #rules
  #options

  errors = {}

  constructor(request, rules, options) {
    this.#request = request
    this.#rules = rules
    this.#options = { locale: 'en', ...(options || {}) }
  }

  /**
   * ERROR-MESSAGES
   * @return {Object}
   */
  get #errorMessages() {
    const errorMessages = require(`./locale/${this.#options.locale}/error-messages`)

    return Object.assign(errorMessages, this.#options.errorMessages?.common || {})
  }

  /**
   * PARSED-RULES
   * @return {Object[]}
   */
  get #parsedRules() {
    const rules = []

    for (const key in this.#rules) {
      const value = this.#rules[key]

      if (key.startsWith('$') || value?.__proto__ !== Object.prototype) {
        continue
      }

      this.#rules[key] = 'object'
      this.#rules['$' + key] = value
    }

    for (const key in this.#rules) {
      const value = this.#rules[key]

      if (
        key.startsWith('$') ||
        (!value && !value?.length) ||
        (typeof value !== 'string' && !Array.isArray(value) && typeof value !== 'function')
      ) {
        continue
      }

      if (typeof value == 'string') {
        rules.push({
          key,
          rules: Validator.parseStringArray(value.split('|'))
        })

        continue
      }

      if (Array.isArray(value)) {
        rules.push({
          key,
          rules: value
            .map((rule) => {
              if (typeof rule === 'string') {
                return Validator.parseStringArray(rule.split('|'))
              }

              if (Array.isArray(rule)) {
                const [name, arg] = rule

                return { name, arg }
              }

              if (typeof rule === 'function') {
                return rule
              }
            })
            .flat()
        })

        continue
      }

      if (typeof value === 'function') {
        rules.push({ key, rules: value })
      }
    }

    return rules
  }

  /**
   * PARSE-STRING-ARRAY
   * @param arr {string[]}
   * @return {Object[]}
   */
  static parseStringArray(arr) {
    return arr.map((rule) => {
      if (rule.includes(':')) {
        const [name, arg] = rule.split(':')

        return { name, arg }
      }

      return { name: rule }
    })
  }

  /**
   * RULE-HANDLER
   * @param name {string}
   * @param options {Object}
   * @return {Promise<string|void>}
   */
  static async ruleHandler(name, options) {
    try {
      const handler = require('./rules/' + config[name])

      return await handler(options)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * SET-ERROR-OR-SKIP
   * @param message {string}
   * @param key {string}
   * @return {boolean}
   */
  #setErrorOrSkip(message, key) {
    if (message === 'skip') {
      return true
    } else if (message) {
      this.errors[key] = message

      return true
    }
  }

  /**
   * FAILS
   * @return {Promise<boolean>}
   */
  async fails() {
    const ruleOptions = {
      request: this.#request,
      rules: this.#rules,
      options: this.#options
    }

    for (const { key, rules } of this.#parsedRules) {
      ruleOptions.requestKey = key
      ruleOptions.requestValue = ruleOptions.request[key]

      if (Array.isArray(rules)) {
        for (const rule of rules) {
          ruleOptions.requestValue = ruleOptions.request[key]

          if (typeof rule === 'function') {
            const message = await rule(ruleOptions)

            if (this.#setErrorOrSkip(message, key)) {
              break
            }

            continue
          }

          const message = await Validator.ruleHandler(rule.name, {
            ...ruleOptions,
            ruleArg: rule.arg,
            errorMessage: {
              default: this.#errorMessages[rule.name],
              custom: this.#options.errorMessages?.pinpoint?.[key]?.[rule.name]
            },
            errorMessagesWrapper
          })

          if (this.#setErrorOrSkip(message, key)) {
            break
          }
        }

        continue
      }

      if (typeof rules === 'function') {
        const message = await rules(ruleOptions)

        if (this.#setErrorOrSkip(message, key)) {
          break
        }
      }
    }

    return this.failed
  }

  /**
   * FAILED
   * @return {boolean}
   */
  get failed() {
    return !_.isEmpty(this.errors)
  }
}
