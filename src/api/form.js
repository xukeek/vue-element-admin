import request from '@/utils/request'

export function queryForm(data) {
  return request({
    url: '/forms',
    method: 'post',
    data
  })
}

export function saveForm(data) {
  return request({
    url: '/form',
    method: 'post',
    data
  })
}
