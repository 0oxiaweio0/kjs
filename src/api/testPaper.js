import request from '@/utils/request'
/* 查询某年级某期的试卷情况*/
export function getPapersList(params) {
  return request({
    url: '/sys/papers/list',
    method: 'get',
    params
  })
}
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
