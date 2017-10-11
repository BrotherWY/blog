import HttpClient from '../network/HttpClient';

/**
 * 登录逻辑
 * @param username 用户名
 * @param password 密码
 */
export function login({ userName, password }) {
  return HttpClient.post('/1.0/login', { userName, password });
}
