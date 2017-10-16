import HttpClient from '../network/HttpClient';

/**
 * 获取所有分类
 */
export function findAll() {
  return HttpClient.get('/1.0/catalog');
}
