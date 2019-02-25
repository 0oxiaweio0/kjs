import request from '@/utils/request'
import qs from 'Qs'

export function loginByUsername(data) {
  const postData = qs.stringify(data)
  return request({
    url: '/api/v1/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: postData
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

