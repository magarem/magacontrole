import request from '@/utils/request'
import {server} from '@/config'
var server2 = (process.env.VUE_APP_BASE_API == '/dev-api') ? 'http://localhost:3000/dev-api' : ''

export function fetchList(query) {
  return request({
    url: server2 + '/vendas',
    method: 'get',
    params: query
  })
}

export function fetchList_vendaItens(query) {
  return request({
    url: server2 + '/vendaItens',
    method: 'get',
    params: query
  })
}

export function createItem(data) {
  return request({
    url: server2 + '/produto',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: server2 + '/produto',
    method: 'patch',
    data
  })
}
