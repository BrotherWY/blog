import axios from 'axios';
import UrlConfig from '@/network/url-config';

const HttpClient = {};

HttpClient.self = {};

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
  url = UrlConfig.apiUrl + url;

  if (method === Method.GET || method === Method.DELETE) {
    url = fullUrl(url, params);
  }

  params = JSON.stringify(params);

  const headers = {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json',
  };

  return axios({
    method: method,
    url: url,
    timeout: 3000,
    data: params,
    headers: headers,
  });
}

axios.interceptors.request.use((config) => {
  HttpClient.self.$Progress.start();
  return config;
}, (error) => {
  HttpClient.self.$Progress.fail();
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  HttpClient.self.$Progress.finish();
  return response;
}, (error) => {
  HttpClient.self.$Progress.fail();
  return Promise.reject(error);
});

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

