import request from '@/utils/request'
import {server} from '@/config'

export function fetchList(query) {
  return request({
    url: server + '/funcionarios',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: server + '/funcionario',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: server + '/funcionario',
    method: 'patch',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: server + '/funcionario',
    method: 'delete',
    data
  })
}
