import request from '@/utils/request'
import {server} from '@/config'

export function fetchList(query) {
  return request({
    url: server + '/produtos',
    method: 'get',
    params: query
  })
}

export function fetch(id) {
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
    url: server + '/produto',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: server + '/produto',
    method: 'patch',
    data
  })
}
