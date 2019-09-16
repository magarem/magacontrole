import request from '@/utils/request'
import {server} from '@/config'

export function fetchList(query) {
  return request({
    url: server + '/compras',
    method: 'get',
    params: query
  })
}

export function fetchList_compraItens(query) {
  return request({
    url: server + '/compraItens',
    method: 'get',
    params: query
  })
}
