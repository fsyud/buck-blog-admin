import request from 'umi-request';

interface ParamsType {
  title: string
  state: string;
  content: string;
  url: string;
  img: string;
  start_time: string;
  end_time: string;
}

interface deleteParam {
  id: string;
}

export async function queryProjectList() {
  return request('/api/queryProjectList', {
    method: 'GET',
  })
}


export async function addProject(params: ParamsType) {
  return request('/api/addProject', {
    method: 'POST',
    data : params
  })
}


export async function delProject(params: deleteParam) {
  return request('/api/delProject', {
    method: 'POST',
    data : params
  })
}


export async function updateProject(params: ParamsType) {
  return request('/api/updateProject', {
    method: 'POST',
    data : params
  })
}

