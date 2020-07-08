import request from '@/utils/request';

// 获取标签列表
export async function queryTagList() {
  return request('/api/queryTagList', {
    method: 'GET'
  });
}
