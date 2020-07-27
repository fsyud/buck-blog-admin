import request from 'umi-request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  keyword?: string;
}

interface deleteParam {
  id: string;
}

export async function queryUserList(params: ParamsType) {
  return request('/api/queryUserList', {
    method: 'GET',
    params : {
      keyword: ''
    }
  })
}


export async function delUser(params: deleteParam) {
  return request('/api/delUser', {
    method: 'POST',
    data : params
  })
}
