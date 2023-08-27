var config = require('./jest.config');
config.testRegex = '\\.spec\\.ts$';
config.modulePathIgnorePatterns = [
  '\\.integration\\.spec\\.ts$',
  '\\.e2e\\.spec\\.ts$',
];

module.exports = config;
