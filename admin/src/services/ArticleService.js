import HttpClient from '../network/HttpClient';

/**
 * 获取所有文章
 */
export function findAll() {
  return HttpClient.get('/1.0/article');
}

export function findAllByPaging({ pageIndex, pageSize, flag }) {
  return HttpClient.get('/1.0/article/paging', { pageIndex, pageSize, flag });
}

export function add(article) {
  return HttpClient.post('/1.0/article/add', article);
}

export function update(article) {
  return HttpClient.put('/1.0/article/update', article);
}

export function updateStatu(article) {
  return HttpClient.put('/1.0/article/updateStatu', { id: article.id, flag: article.flag });
}

export function batchUpdateStatu(data) {
  const ids = data.selectIds.map(article => article.id);
  return HttpClient.put('/1.0/article/batchUpdateStatu', { ids: ids, flag: data.flag });
}

export function remove(id) {
  return HttpClient.delete('/1.0/article/delete', { id: id });
}

export function batchDelete(articles) {
  // 解析出ids
  const ids = articles.map(article => article.id);
  return HttpClient.delete('/1.0/article/batchDelete', { ids: ids });
}

export function search({ pageIndex, pageSize, data }) {
  const params = {
    flag: data.flag,
  };
  if (data.selTime) {
    params.start = resolveTime(data.selTime[0]);
    params.end = resolveTime(data.selTime[1]);
  }
  return HttpClient.post('/1.0/article/search', { pageIndex, pageSize, params });
}

/**
 * 解析出毫秒数
 */
function resolveTime(val) {
  return new Date(val).getTime();
}
