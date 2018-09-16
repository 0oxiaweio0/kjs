/**
 * Created by xiawei on 2018/9/15.
 */
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * validata phone
 * @param phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  const re = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
  return re.test(phone)
}

/**
 * valiDate username
 * @param username
 * @returns { boolean }
 * @rule 用户名由字母数字下划线组成
 */
export function validateUsername(username) {
  const re = /^[a-zA-Z0-9_]{4,16}$/
  return re.test(username.trim())
}

/**
 * valiDate password
 * @param password
 * @returns { boolean }
 * @rule //由数字、26个英文字母或者下划线组成的字符串,6-16个字符
 */
export function validatePassword(password) {
  const re = /^\w{6,16}$/
  return re.test(password.trim())
}

/**
 * valiDate password（二次验证）
 * @param password
 * @returns { boolean }
 * @rule //由数字、26个英文字母或者下划线组成的字符串,6-16个字符
 */
export function validateRePassword(password) {
  const re = /^\w{6,16}$/
  return re.test(password.trim())
}
