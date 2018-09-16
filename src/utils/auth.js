import Cookies from 'js-cookie'

// Token相关函数
const TokenKey = 'User-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 登录记住功能函数
const RemberAccount = 'User-Rember'

export function getRember() {
  return Cookies.get(RemberAccount)
}

export function setRember(account) {
  return Cookies.set(RemberAccount, account)
}

export function removeRember() {
  return Cookies.remove(RemberAccount)
}
