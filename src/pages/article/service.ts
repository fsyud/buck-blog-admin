import request from 'umi-request';

interface ParamsType {
  state?: string;
  keyword?: string;
}

export async function queryArticleList(params: ParamsType) {
  return request('/api/queryArticleList', {
    params,
  });
}
