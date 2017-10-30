const UrlConfig = {};
if (process.env.NODE_ENV === 'development') UrlConfig.apiUrl = 'http://localhost:3000';
else UrlConfig.apiUrl = 'http://104.129.182.249:3000';
module.exports = UrlConfig;
