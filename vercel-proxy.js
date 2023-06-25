const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/rss/',
        createProxyMiddleware({
            target: process.env.RSS_API_HOST,
            changeOrigin: true,
            pathRewrite: {
                '^/api/rss/': '/',
            }
        })
    );
    app.use(
        '/memos/',
        createProxyMiddleware({
            target: process.env.MEMOS_API_HOST,
            changeOrigin: true,
            pathRewrite: {
                '^/api/memos/': '/',
            }
        })
    );
};
