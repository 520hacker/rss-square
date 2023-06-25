
// // import fetch from 'node-fetch';

// // const require = require('esm')(module);

// module.exports = async (req, res) => {
//   const { url } = req.query;
//   const targetUrl = `${process.env.RSS_API_HOST}/${url}`;

//   const response = await fetch(targetUrl);
//   const data = await response.json();

//   res.json(data);
// };


// api/proxy.js
// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''
  console.log(req.url)
  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  // target 替换为你跨域请求的服务器 如： http://gmall-h5-api.atguigu.cn
  if (req.url.startsWith('/api/rss')) {
    // target = 'http://gmall-h5-api.atguigu.cn'
    target = `${process.env.RSS_API_HOST}/`;
  }
  
  if(req.url.startsWith('/api/memo')) {
    // target = 'http://gmall-h5-api.atguigu.cn'
    target = `${process.env.MEMOS_API_HOST}/`;
  }

  console.log(target)
  // const { url } = req.query;
  // const targetUrl = `${process.env.RSS_API_HOST}/${url}`;
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      // 如果开启了,那么 /api/user/login 将被转发到 http://gmall-h5-api.atguigu.cn/user/login
      '^/api/rss': '/',
      // '^/api/memo': '/api/memo',
    },
  })(req, res)
}
