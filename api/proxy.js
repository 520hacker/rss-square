const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url } = req.query;
  const targetUrl = `${process.env.RSS_API_HOST}${url}`;

  const response = await fetch(targetUrl);
  const data = await response.json();

  res.json(data);
};