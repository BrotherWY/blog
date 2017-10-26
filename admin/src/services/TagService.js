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
  tag.count = 0;
  if (!tag.article_ids) tag.article_ids = '';
  return HttpClient.post('/1.0/tag/add', tag);
}

export function update(tag) {
  return HttpClient.put('/1.0/tag/update', tag);
}

export function remove(id) {
  return HttpClient.delete('/1.0/tag/delete', { id: id });
}

export function batchDelete(tags) {
  // 解析出ids
  const ids = tags.map(tag => tag.id);
  return HttpClient.delete('/1.0/tag/batchDelete', { ids: ids });
}

export function search({ pageIndex, pageSize, data }) {
  const params = {
    name: data.name,
  };
  if (data.selTime) {
    params.start = resolveTime(data.selTime[0]);
    params.end = resolveTime(data.selTime[1]);
  }
  return HttpClient.post('/1.0/tag/search', { pageIndex, pageSize, params });
}

/**
 * 解析出毫秒数
 */
function resolveTime(val) {
  return new Date(val).getTime();
}
