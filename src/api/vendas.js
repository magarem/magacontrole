import request from '@/utils/request'
import {server} from '@/config'

export function fetchList(query) {
  return request({
    url: server + '/vendas',
    method: 'get',
    params: query
  })
}

export function fetchList_vendaItens(query) {
  return request({
    url: server + '/vendaItens',
    method: 'get',
    params: query
  })
}

export function createItem(data) {
  return request({
    url: server + '/produto',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: server + '/produto',
    method: 'patch',
    data
  })
}
