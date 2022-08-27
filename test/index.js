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

      variant.rules = Array.isArray(variant.rules) ? variant.rules : [variant.rules]

      for (let r = 0; r < variant.rules.length; r++) {
        const rules = variant.rules[r]

        variant.body = Array.isArray(variant.body) ? variant.body : [variant.body]

        for (let b = 0; b < variant.body.length; b++) {
          const body = variant.body[b]

          await validator(body, rules)
            .then((errors) => {
              if (!variant.test(errors)) {
                console.log(`Test #${id}/R:${r}/B:${b} failed: [${ruleName}]`)
              }
            })
            .catch((err) => console.error(`Test #${id}/${b} error: [${ruleName}]:`, err))
        }
      }
    }
  }

  console.log('Test finished!')
})()
