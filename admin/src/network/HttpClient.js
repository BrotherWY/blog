import axios from 'axios';
import UrlConfig from './url-config';

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
  if (!params) params = {};

  url = UrlConfig.apiUrl + url;

  if (method === Method.GET || method === Method.DELETE) {
    url = fullUrl(url, params);
  }

  params = JSON.stringify(params);

  const headers = {
    'Content-Type': 'application/json',
  };

  return new Promise((resolve) => {
    axios({
      method: method,
      url: url,
      timeout: 3000,
      data: params,
      headers: headers,
    })
    .then((res) => {
      if (res.data.code === -1) {
        resolve({ success: false, msg: res.data.msg });
      } else {
        resolve({ success: true, data: res.data.data });
      }
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

