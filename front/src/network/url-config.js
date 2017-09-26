const UrlConfig = {};
if (process.env.NODE_ENV === 'development') UrlConfig.apiUrl = 'http://www.157257.com';
else UrlConfig.apiUrl = 'https://juhe.yqwb.com';
module.exports = UrlConfig;
