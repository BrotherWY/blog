import HttpClient from '../network/HttpClient';

/**
 * 获取所有标签
 */
export function findAll() {
  return HttpClient.get('/1.0/tag');
}
