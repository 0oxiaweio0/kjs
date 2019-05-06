import request from '@/utils/request'
/* 查询某年级某期的试卷情况*/
export function getPapersList(params) {
  return request({
    url: '/sys/papers/list',
    method: 'get',
    params
  })
}
