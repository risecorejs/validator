module.exports = {
  // BREAK
  allowEmpty: require('./break/allow-empty'),
  allowFalse: require('./break/allow-false'),
  allowNull: require('./break/allow-null'),
  allowZero: require('./break/allow-zero'),
  ifExists: require('./break/if-exists'),

  // COMPUTE
  as: require('./compute/as'),
  between: require('./compute/between'),
  if: require('./compute/if')
}
