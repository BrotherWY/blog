import HttpClient from '../network/HttpClient';

/**
 * 获取所有标签
 */
export function findAll() {
  return HttpClient.get('/1.0/catalog');
}

export function findAllByPaging({ pageIndex, pageSize }) {
  return HttpClient.get('/1.0/catalog/paging', { pageIndex, pageSize });
}

export function add(catalog) {
  catalog.count = 0;
  return HttpClient.post('/1.0/catalog/add', catalog);
}

export function update(catalog) {
  return HttpClient.put('/1.0/catalog/update', catalog);
}

export function remove(id) {
  return HttpClient.delete('/1.0/catalog/delete', { id: id });
}

export function batchDelete(catalogs) {
  // 解析出ids
  const ids = catalogs.map(catalog => catalog.id);
  return HttpClient.delete('/1.0/catalog/batchDelete', { ids: ids });
}

export function search({ pageIndex, pageSize, data }) {
  const params = {
    name: data.name,
  };
  if (data.selTime) {
    params.start = resolveTime(data.selTime[0]);
    params.end = resolveTime(data.selTime[1]);
  }
  return HttpClient.post('/1.0/catalog/search', { pageIndex, pageSize, params });
}

/**
 * 解析出毫秒数
 */
function resolveTime(val) {
  return new Date(val).getTime();
}
