const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/rss/': {
        target: process.env.RSS_API_HOST,
        changeOrigin: true,
        pathRewrite: {
          '^/api/rss': ''
        }
      },
      '/api/memos/': {
        target: process.env.MEMOS_API_HOST,
        changeOrigin: true,
        pathRewrite: {
          '^/api/memos': ''
        }
      },
    }
  }
})

