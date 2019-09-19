import request from '@/utils/request'
import {server} from '@/config'
var server2 = (process.env.VUE_APP_BASE_API == '/dev-api') ? 'http://localhost:3000/dev-api' : ''

export function fetchList(query) {
  return request({
    url: server2 + '/clientes',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: server2 + '/cliente',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: server2 + '/cliente',
    method: 'patch',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: server2 + '/cliente',
    method: 'delete',
    data
  })
}
