import request from '@/utils/request'

export function queryForm(data) {
  return request({
    url: '/forms',
    method: 'post',
    data
  })
}
