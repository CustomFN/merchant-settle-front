import request from '@/utils/request'

export function login (userId, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userId,
      password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
