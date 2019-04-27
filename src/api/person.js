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
export function addTeacher() {
  return request({
    url: '/sys/tmg',
    method: 'post'
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
export function addSchool() {
  return request({
    url: '/sys/school',
    method: 'post'
  })
}
/* 获取学校列表*/
export function getSchool() {
  return request({
    url: '/sys/schools',
    method: 'get'
  })
}
