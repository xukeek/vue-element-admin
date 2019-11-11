import request from '@/utils/request'

export function queryWorkflow(data) {
  return request({
    url: '/models',
    method: 'post',
    data
  })
}

export function deployWorkflow(data) {
  return request({
    url: '/models/deploy',
    method: 'post',
    data
  })
}
