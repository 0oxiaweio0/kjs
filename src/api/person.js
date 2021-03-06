/**
 * Created by xiawei on 2019/2/24.
 */
import request from '@/utils/request'
/* 获取所有教师*/
export function getTeacherAll() {
  return request({
    url: '/sys/tmg',
    method: 'get'
  })
}
/* 添加教师*/
export function addTeacher(data) {
  return request({
    url: '/sys/tmg',
    method: 'post',
    data
  })
}
/* 获取班级列表*/
export function getClassList() {
  return request({
    url: '/sys/clsmg',
    method: 'get'
  })
}
/* 添加学校*/
export function addSchool(data) {
  return request({
    url: '/sys/school',
    method: 'post',
    data
  })
}
/* 更新学校*/
export function updateSchool(data, id) {
  var post = data
  delete post.id
  return request({
    url: '/sys/schoolop/' + id,
    method: 'put',
    data: post
  })
}
/* 获取学校列表*/
export function getSchool() {
  return request({
    url: '/sys/schools',
    method: 'get'
  })
}
/* 获取管理员列表*/
export function getManagerList() {
  return request({
    url: '/sys/manager/list',
    method: 'get'
  })
}
/* 获取管理员列表*/
export function addAdmin(data) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    data
  })
}
/* 冻结管理员*/
export function lockAdmin(id) {
  return request({
    url: '/sys/manager/lock/' + id,
    method: 'put'
  })
}
/* 解冻结管理员*/
export function unlockAdmin(id) {
  return request({
    url: '/sys/manager/unlock/' + id,
    method: 'put'
  })
}
/* 修改普通管理员密码*/
export function editPwd(data) {
  return request({
    url: '/sys/user/general/pwd',
    method: 'post',
    data
  })
}
/* 修改超级管理员密码*/
export function editSupPwd(data) {
  return request({
    url: '/sys/user/super/pwd',
    method: 'post',
    data
  })
}
/* 拒绝审核*/
export function reject(id) {
  return request({
    url: '/sys/user/reject/' + id,
    method: 'put'
  })
}
/* 审核通过*/
export function check(id) {
  return request({
    url: '/sys/user/check/' + id,
    method: 'put'
  })
}
/* 冻结教师*/
export function lockUser(id) {
  return request({
    url: '/sys/user/lock/' + id,
    method: 'put'
  })
}
/* 解冻教师*/
export function unlockUser(id) {
  return request({
    url: '/sys/user/unlock/' + id,
    method: 'put'
  })
}
/* 获取年级树*/
export function getClassTree() {
  return request({
    url: '/sys/sclstree',
    method: 'get'
  })
}
/* 获取年级树*/
export function postConfmg(data) {
  return request({
    url: '/sys/confmg',
    method: 'post',
    data
  })
}
/* h获取省*/
export function getProvince() {
  return request({
    url: '/sys/area',
    method: 'get'
  })
}
/* 获取市级数据*/
export function getCity(data) {
  return request({
    url: '/sys/area',
    method: 'get',
    params: data
  })
}
/* 获取区级数据*/
export function getArea(data) {
  return request({
    url: '/sys/area',
    method: 'get',
    params: data
  })
}
