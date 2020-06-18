import request from 'umi-request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  state?: number;
}

export async function queryTimeLine(params: ParamsType) {
  return request('/api/queryTimeLine', {
    params : {
      state: ''
    }
  });
}
