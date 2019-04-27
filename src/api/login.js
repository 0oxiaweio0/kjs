import request from '@/utils/request'
// import qs from 'Qs'

export function loginByUsername(data) {
  // const postData = qs.stringify(data)
  return request({
    url: '/sys/login',
    method: 'post',
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
export function getBaseCode() { // 基础数据编码
  return request({
    url: '/sys/bsvc',
    method: 'get'
  })
}

