/* config-overrides.js */
const { resolve } = require("path")

module.exports = function override(config, env) {
  config.output.path = resolve(__dirname, 'docs')
  config.output.publicPath = 'https://tianwening.github.io'
  return config;
}