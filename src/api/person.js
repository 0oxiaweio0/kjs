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
