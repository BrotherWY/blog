import HttpClient from '../network/HttpClient';

export function findAll() {
  return HttpClient.get('/1.0/config');
}

export function findAllByPaging({ pageIndex, pageSize }) {
  return HttpClient.get('/1.0/config/paging', { pageIndex, pageSize });
}

export function add(config) {
  return HttpClient.post('/1.0/config/add', config);
}

export function update(config) {
  return HttpClient.put('/1.0/config/update', config);
}

export function remove(id) {
  return HttpClient.delete('/1.0/config/delete', { id: id });
}

export function batchDelete(configs) {
  // 解析出ids
  const ids = configs.map(config => config.id);
  return HttpClient.delete('/1.0/config/batchDelete', { ids: ids });
}

export function search({ pageIndex, pageSize, data }) {
  const params = {
    name: data.name,
  };
  if (data.selTime) {
    params.start = resolveTime(data.selTime[0]);
    params.end = resolveTime(data.selTime[1]);
  }
  return HttpClient.post('/1.0/config/search', { pageIndex, pageSize, params });
}

/**
 * 解析出毫秒数
 */
function resolveTime(val) {
  return new Date(val).getTime();
}
