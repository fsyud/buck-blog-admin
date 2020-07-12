import request from 'umi-request';
import { BasicListItemDataType, timeListItem } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  state?: number;
}

interface deleteParam {
  id: string;
}

export async function queryTimeLine(params: ParamsType) {
  return request('/api/queryTimeLine', {
    params : {
      state: ''
    }
  })
}

export async function addTimeLine(params: timeListItem) {
  return request('/api/addTimeLine', {
    method: 'POST',
    data : params
  })
}

export async function updateTimeTimeline(params: timeListItem) {
  return request('/api/updateTimeTimeline', {
    method: 'POST',
    data : params
  })
}

export async function delTimeline(params: deleteParam) {
  return request('/api/delTimeline', {
    method: 'POST',
    data : params
  })
}
