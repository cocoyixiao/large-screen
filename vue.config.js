var webpack = require('webpack')
// const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: '/dps',
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  // 打包时不生成.map文件
  productionSourceMap: true,
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    noInfo: true,
    overlay: true,
    open: true,
    proxy: {
      '/restApi': {
        target: 'http://haina.myzx.cn/', // 接口域名
        ws: true,
        pathRewrite: {
          '^/restApi': ''
        },
        changeOrigin: true // 是否跨域
      }
    },
    public: 'localhost:8080' // 本地ip
  }
}