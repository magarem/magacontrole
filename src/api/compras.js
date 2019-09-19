import request from '@/utils/request'
import {server} from '@/config'
var server2 = (process.env.VUE_APP_BASE_API == '/dev-api') ? 'http://localhost:3000/dev-api' : ''

export function fetchList(query) {
  return request({
    url: server2 + '/compras',
    method: 'get',
    params: query
  })
}

export function fetchList_compraItens(query) {
  return request({
    url: server2 + '/compraItens',
    method: 'get',
    params: query
  })
}
