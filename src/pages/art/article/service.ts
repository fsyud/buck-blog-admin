import request from 'umi-request';
import { updateArticleParam } from './data.d'

interface ParamsType {
  state?: string;
  keyword?: string;
}

interface deleteParam {
  id: string;
}

// 获取文章列表
export async function queryArticleList(params: ParamsType) {
  return request('/api/queryArticleList', {
    params,
  });
}

// 删除文章
export async function delArticle(params: deleteParam) {
  return request('/api/delArticle', {
    method: 'POST',
    data: params
  });
}

// 修改文章
export async function updateArticle(params: updateArticleParam) {
  return request('/api/updateArticle', {
    method: 'POST',
    data: params
  });
}
