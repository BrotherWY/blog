const UrlConfig = {};
if (process.env.NODE_ENV === 'development') UrlConfig.apiUrl = 'https://easy-mock.com/mock/59ca4b15e0dc663341bbffa1/1.0';
else UrlConfig.apiUrl = 'https://easy-mock.com/mock/59ca4b15e0dc663341bbffa1/1.0';
module.exports = UrlConfig;
