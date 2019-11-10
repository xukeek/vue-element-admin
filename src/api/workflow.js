import request from '@/utils/request'

export function queryWorkflow(data) {
  return request({
    url: '/models',
    method: 'post',
    data
  })
}
