import axios from 'axios';
import UrlConfig from '@/network/url-config';

const HttpClient = {};

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

HttpClient.get = (url, params) => request(Method.GET, url, params);

HttpClient.post = (url, params) => request(Method.POST, url, params);

HttpClient.put = (url, params) => request(Method.PUT, url, params);

HttpClient.delete = (url, params) => request(Method.DELETE, url, params);


function request(method, url, params) {
  if (!params)params = {};

  url = UrlConfig.apiUrl + url;

  if (method === Method.GET || method === Method.DELETE) {
    url = fullUrl(url, params);
  }

  params = JSON.stringify(params);

  const headers = {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json',
  };

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      timeout: 3000,
      data: params,
      headers: headers,
    })
    .then((res) => {
      resolve(res.data.data);
    })
    .catch(() => {
      // 这里需要重新抓取一下错误提示
      reject({ msg: '网络错误' });
    });
  });
}

function fullUrl(url, params) {
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    url += i === 0
      ? '?'
      : '&';
    url += `${key}=${params[key]}`;
  }
  return url;
}

export default HttpClient;

