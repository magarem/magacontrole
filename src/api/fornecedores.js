import request from '@/utils/request'
import {server} from '@/config'
var server2 = (process.env.VUE_APP_BASE_API == '/dev-api') ? 'http://localhost:3000/dev-api' : ''

export function fetchList(query) {
  return request({
    url: server2 + '/fornecedores',
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

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: server + '/produto',
    method: 'delete',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: server2 + '/fornecedor',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: server2 + '/fornecedor',
    method: 'patch',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: server2 + '/fornecedor',
    method: 'delete',
    data
  })
}
