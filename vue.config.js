module.exports = {
    publicPath: '',
    configureWebpack: {
    plugins: [
      require('unplugin-auto-import/webpack')({ /* options */ }),
    ],
  },
}