import request from 'umi-request';

interface ParamsType {
  title?: string;
  author?: string;
  content: string;
  desc: string;
  tags: string;
}

// 添加文章
export async function addArticle(params: ParamsType) {
  return request('/api/addArticle', {
    params,
  });
}

// 获取标签列表
export async function queryTagList() {
  return request('/api/addArticle', {
    method: 'GET'
  });
}
