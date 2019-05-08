/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const statisticsRouterMap = [
  /* 统计报告 */
  {
    path: '/statistics',
    component: Layout,
    redirect: 'noredirect',
    name: 'app.statistics',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'statistics',
      name: '统计报告',
      group: 'statistics',
      icon: 'statistics'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/statistics/index'),
      name: 'app.statistics.index',
      meta: {
        roles: ['superAdmin', 'admin'],
        icon: 'statistics',
        title: 'statisticsIndex',
        group: 'statistics',
        name: '统计报告'
      }
    }
    ]
  }
]

export default statisticsRouterMap
