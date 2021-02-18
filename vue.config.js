const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new MomentLocalesPlugin({ localesToKeep: ['zh-cn'] })],
  },
}
