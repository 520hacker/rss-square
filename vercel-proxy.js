import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
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
        '/api/memos/',
        createProxyMiddleware({
            target: process.env.MEMOS_API_HOST,
            changeOrigin: true,
            pathRewrite: {
                '^/api/memos/': '/api',
            }
        })
    );
};
