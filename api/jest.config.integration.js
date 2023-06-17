var config = require('./jest.config')
config.testRegex = "\\.integration\\.spec\\.ts$" //Overriding testRegex option
module.exports = config