import request from '@/utils/request'
import {server} from '@/config'

var server2 = (process.env.VUE_APP_BASE_API == '/dev-api') ? 'http://localhost:3000/dev-api' : ''

export function fetchList(query) {
  return request({
    url: server2 + '/produtos',
    method: 'get',
    params: query
  })
}

export function fetch(id) {
  return request({
    url: server2 + '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  // console.log('pv:', pv);
  return request({
    url: server2 + '/produto',
    method: 'delete',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: server2 + '/produto',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: server2 + '/produto',
    method: 'patch',
    data
  })
}
