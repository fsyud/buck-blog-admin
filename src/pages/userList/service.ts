import request from 'umi-request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  keyword?: string;
}

export async function queryUserList(params: ParamsType) {
  return request('/api/queryUserList', {
    method: 'GET',
    params : {
      keyword: ''
    }
  })
}

// export async function removeFakeList(params: ParamsType) {
//   const { count = 5, ...restParams } = params;
//   return request('/api/fake_list', {
//     method: 'POST',
//     params: {
//       count,
//     },
//     data: {
//       ...restParams,
//       method: 'delete',
//     },
//   });
// }

