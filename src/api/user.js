import request from '@/utils/request'
import {server} from '@/config'

// server_ops = ['http://localhost:3000/dev-api/user/login', '/user/login']
//var server2 = (process.env.VUE_APP_BASE_API == '/dev-api') ? 'http://localhost:3000/dev-api' : ''
// alert (server)
export function login(data) {
  return request({
    url:  'http://localhost:3000/dev-api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
