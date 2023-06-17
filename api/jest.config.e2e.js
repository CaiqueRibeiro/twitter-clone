var config = require('./jest.config')
config.testRegex = "\\.e2e.spec\\.ts$" //Overriding testRegex option
module.exports = config