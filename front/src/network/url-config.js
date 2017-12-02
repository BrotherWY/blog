const UrlConfig = {};
if (process.env.NODE_ENV === 'development') UrlConfig.apiUrl = 'http://localhost:3000';
else UrlConfig.apiUrl = 'http://207.246.102.22:3000';
module.exports = UrlConfig;
