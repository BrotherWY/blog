import HttpClient from '../network/HttpClient';

export function findAll() {
  return HttpClient.get('/1.0/menu');
}

export function findAllByPaging({ pageIndex, pageSize }) {
  return HttpClient.get('/1.0/menu/paging', { pageIndex, pageSize });
}

export function add(menu) {
  return HttpClient.post('/1.0/menu/add', menu);
}

export function update(menu) {
  return HttpClient.put('/1.0/menu/update', menu);
}

export function remove(id) {
  return HttpClient.delete('/1.0/menu/delete', { id: id });
}

export function batchDelete(menus) {
  // 解析出ids
  const ids = menus.map(menu => menu.id);
  return HttpClient.delete('/1.0/menu/batchDelete', { ids: ids });
}

export function search({ pageIndex, pageSize, data }) {
  const params = {
    name: data.name,
  };
  if (data.selTime) {
    params.start = resolveTime(data.selTime[0]);
    params.end = resolveTime(data.selTime[1]);
  }
  return HttpClient.post('/1.0/menu/search', { pageIndex, pageSize, params });
}

/**
 * 解析出毫秒数
 */
function resolveTime(val) {
  return new Date(val).getTime();
}
