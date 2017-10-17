import HttpClient from '../network/HttpClient';

/**
 * 获取所有标签
 */
export function findAll() {
  return HttpClient.get('/1.0/tag');
}

export function findAllByPaging({ pageIndex, pageSize }) {
  return HttpClient.get('/1.0/tag/paging', { pageIndex, pageSize });
}

export function add(tag) {
  return HttpClient.post('/1.0/tag/add', tag);
}

export function update(tag) {
  return HttpClient.put('/1.0/tag/update', tag);
}

export function remove(id) {
  return HttpClient.delete('/1.0/tag/delete', { id: id });
}
