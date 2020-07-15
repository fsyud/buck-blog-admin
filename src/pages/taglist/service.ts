import request from '@/utils/request';


interface tagParam {
  name: string;
  desc: string;
}

// 获取标签列表
export async function queryTagList() {
  return request('/api/queryTagList', {
    method: 'GET'
  });
}

// 添加标签
export async function addTag(param: tagParam) {
  return request('/api/addTag', {
    method: 'POST',
    data: param
  });
}

// 删除标签
export async function delTag(id: string) {
  return request('/api/delTag', {
    method: 'POST',
    data: id
  });
}

