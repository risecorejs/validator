const rules = require('./rules')

const validator = require('../index').default

void (async () => {
  const ruleNames = Object.keys(rules)

  for (let i = 0; i < ruleNames.length; i++) {
    const ruleName = ruleNames[i]

    const variants = rules[ruleName]()

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i]
      const id = i + 1

      variant.body = Array.isArray(variant.body) ? variant.body : [variant.body]

      for (let i = 0; i < variant.body.length; i++) {
        const body = variant.body[i]

        await validator(body, variant.rules)
          .then((errors) => {
            if (!variant.test(errors)) {
              console.log(`Test #${id}/${i} failed: [${ruleName}]`)
            }
          })
          .catch((err) => console.error(`Test #${id}/${i} error: [${ruleName}]:`, err))
      }
    }
  }

  console.log('Test finished!')
})()
