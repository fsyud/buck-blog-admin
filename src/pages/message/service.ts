import request from 'umi-request';

interface ParamsType {
  state: number;
  id: string;
  index?: number;
}

export async function queryMessageList(state: any) {
  return request('/api/queryMessageList', {
    params: state
  })
}

export async function delMessage(id: string) {
  return request('/api/delMessage', {
    method: 'POST',
    data : id
  })
}

export async function changeMessage(params: ParamsType) {
  return request('/api/changeMessage', {
    method: 'POST',
    data : params
  })
}

export async function changeThirdMessage(params: ParamsType) {
  return request('/api/changeThirdMessage', {
    method: 'POST',
    data : params
  })
}

