const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const plugins = [new MomentLocalesPlugin({ localesToKeep: ['zh-cn'] })]
if (process.env.NODE_ENV === 'production') {
  plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
}

module.exports = {
  lintOnSave: false,
  configureWebpack: { plugins },
}
