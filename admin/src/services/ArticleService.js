import HttpClient from '../network/HttpClient';

/**
 * 获取所有分类
 */
export function add(article) {
  return HttpClient.post('/1.0/article/add', article);
}
