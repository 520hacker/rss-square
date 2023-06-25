const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://2504.qiangtu.com:8087/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  }
})

