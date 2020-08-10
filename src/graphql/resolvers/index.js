const merge = require('lodash.merge')

module.exports = merge(
  { Query: { hello: () => 'hello to you too' } },
  require('./userQueryResolver'),
  require('./fitbitUserQueryResolver')
)
