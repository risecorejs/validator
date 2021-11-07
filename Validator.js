const _ = require('lodash')

const ruleConfig = require(__dirname + '/rule-config')
const errorMessagesWrapper = require(__dirname + '/error-messages-wrapper')

module.exports = class Validator {
  #request
  #rules
  #options

  errors = {}

  constructor(request, rules, options = {}) {
    this.#request = request
    this.#rules = rules
    this.#options = { locale: 'en', ...options }
  }

  get #errorMessages() {
    return require(`${__dirname}/locale/${this.#options.locale}/error-messages`)
  }

  get #formattedRules() {
    const formattedRules = []

    for (const key in this.#rules) {
      const value = this.#rules[key]

      if (key.startsWith('$') || value?.__proto__ !== Object.prototype) continue

      this.#rules[key] = 'object'
      this.#rules['$' + key] = value
    }

    for (const key in this.#rules) {
      const value = this.#rules[key]

      if (
        key.startsWith('$') ||
        (!value && !value?.length) ||
        (typeof value !== 'string' && !Array.isArray(value) && typeof value !== 'function')
      )
        continue

      if (typeof value == 'string') {
        const rules = value.split('|').map((rule) => {
          if (rule.includes(':')) {
            const [name, arg] = rule.split(':')

            return { name, arg }
          }

          return { name: rule }
        })

        formattedRules.push({ key, rules })

        continue
      }

      if (Array.isArray(value)) {
        const rules = value.map((rule) => {
          if (typeof rule === 'string') {
            if (rule.includes(':')) {
              const [name, arg] = rule.split(':')

              return { name, arg }
            }

            return { name: rule }
          }

          if (Array.isArray(rule)) {
            const [name, arg] = rule

            return { name, arg }
          }

          if (typeof rule === 'function') {
            return rule
          }
        })

        formattedRules.push({ key, rules })

        continue
      }

      if (typeof value === 'function') {
        formattedRules.push({ key, rules: value })
      }
    }

    return formattedRules
  }

  async #ruleHandler(name, options) {
    try {
      const handler = require(__dirname + '/rule-handlers/' + ruleConfig[name])

      return await handler(options)
    } catch (err) {
      console.log(err)
    }
  }

  async fails() {
    for (const { key, rules } of this.#formattedRules) {
      if (Array.isArray(rules)) {
        for (const rule of rules) {
          if (typeof rule === 'function') {
            const message = await rule({
              request: this.#request,
              rules: this.#rules,
              options: this.#options,
              requestKey: key,
              requestValue: this.#request[key]
            })

            if (message) {
              if (message === 'skip') {
                break
              } else {
                this.errors[key] = message

                break
              }
            }

            continue
          }

          const message = await this.#ruleHandler(rule.name, {
            request: this.#request,
            rules: this.#rules,
            options: this.#options,
            requestKey: key,
            requestValue: this.#request[key],
            ruleArg: rule.arg,
            errorMessage: {
              default: this.#errorMessages[rule.name],
              custom: this.#options.errorMessages?.[key]?.[rule.name]
            },
            errorMessagesWrapper
          })

          if (message === 'skip') {
            break
          } else if (message) {
            this.errors[key] = message

            break
          }
        }

        continue
      }

      if (typeof rules === 'function') {
        const message = await rules({
          request: this.#request,
          rules: this.#rules,
          options: this.#options,
          requestKey: key,
          requestValue: this.#request[key]
        })

        if (message) {
          if (message === 'skip') {
            break
          } else {
            this.errors[key] = message

            break
          }
        }
      }
    }

    return this.failed
  }

  get failed() {
    return !_.isEmpty(this.errors)
  }
}
