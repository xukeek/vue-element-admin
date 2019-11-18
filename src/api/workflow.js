import request from '@/utils/request'

export function queryWorkflow(data) {
  return request({
    url: '/workflow/models',
    method: 'post',
    data
  })
}

export function deployWorkflow(data) {
  return request({
    url: '/workflow/models/deploy',
    method: 'post',
    data
  })
}

export function startWorkflow(key) {
  return request({
    url: '/workflow/models/start?key=' + key,
    method: 'get'
  })
}

export function queryWorkflowInstance(data) {
  return request({
    url: '/workflow/model/instances',
    method: 'post',
    data
  })
}
