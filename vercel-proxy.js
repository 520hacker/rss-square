const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://2504.qiangtu.com:8087',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
