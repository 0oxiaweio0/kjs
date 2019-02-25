/**
 * Created by xiawei on 2019/2/24.
 */
import request from '@/utils/request'

export function getSchool() {
  return request({
    url: '/api/v1/schools',
    method: 'get'
  })
}
