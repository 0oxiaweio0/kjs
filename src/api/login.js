import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/api/v1/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    },
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

