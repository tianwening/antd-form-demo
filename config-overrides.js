/* config-overrides.js */
const { resolve } = require("path")

module.exports = function override(config, env) {
  config.output.path = resolve(__dirname, 'docs')
  return config;
}