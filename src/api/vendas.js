import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:8080/dev-api/vendas',
    method: 'get',
    params: query
  })
}

export function fetchList_vendaItens(query) {
  return request({
    url: 'http://localhost:8080/dev-api/vendaItens',
    method: 'get',
    params: query
  })
}

export function createItem(data) {
  return request({
    url: 'http://localhost:8080/dev-api/produto',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: 'http://localhost:8080/dev-api/produto',
    method: 'patch',
    data
  })
}
