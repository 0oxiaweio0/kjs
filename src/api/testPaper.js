import request from '@/utils/request'
/* 添加知识点*/
export function addKnown(data) {
  return request({
    url: '/sys/known',
    method: 'post',
    data
  })
}
/* 知识点列表*/
export function getKnownList() {
  return request({
    url: '/sys/known',
    method: 'get'
  })
}
/* 添加知识点*/
export function delKnown(data) {
  return request({
    url: '/sys/known',
    method: 'DELETE',
    data
  })
}
/* 添加试卷*/
export function addPaper(data) {
  return request({
    url: '/sys/paper',
    method: 'post',
    data
  })
}
/* 修改试卷*/
export function editPaper(id, data) {
  return request({
    url: '/sys/paper/' + id,
    method: 'put',
    data
  })
}
/* 查询某年级某期的试卷情况*/
export function getPapersList(params) {
  return request({
    url: '/sys/papers/list',
    method: 'get',
    params
  })
}
/* 获取试卷列表左侧的统计信息（试卷总数、使用学校数等）*/
export function getPapersHeader(params) {
  return request({
    url: '/sys/papers/overview',
    method: 'get',
    params
  })
}
/* 获取试卷试题数据*/
export function getpqlist(id) {
  return request({
    url: '/sys/pqlist/' + id,
    method: 'get'
  })
}
/* 获取试卷基本信息*/
export function getpqInfo(id) {
  return request({
    url: '/sys/pinfo/' + id,
    method: 'get'
  })
}
/* 查询选项选择情况*/
export function getporate(id) {
  return request({
    url: '/sys/porate/' + id,
    method: 'get'
  })
}
/* 查询知识点得分率*/
export function getkrate(id) {
  return request({
    url: '/sys/krate/' + id,
    method: 'get'
  })
}
/* 查询试卷问题得分率*/
export function getpqrate(id) {
  return request({
    url: '/sys/pqrate/' + id,
    method: 'get'
  })
}
/* 统计报告查询-查询整个平台统计信息*/
export function getPlatformPaper(params) {
  return request({
    url: '/sys/plreport',
    method: 'get',
    params
  })
}
/* 统计报告查询-查询整个平台统计信息*/
export function getPlatform() {
  return request({
    url: '/sys/platform/static',
    method: 'get'
  })
}
/* 统计报告查询-查询整个平台统计信息*/
export function getSchoolStatic(params) {
  return request({
    url: '/sys/school/static/',
    method: 'get',
    params
  })
}
