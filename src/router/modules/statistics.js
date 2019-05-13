/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const statisticsRouterMap = [
  /* 统计报告 */
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    name: 'app.statistics',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'statistics',
      name: '统计报告',
      group: 'paper',
      icon: 'statistics'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/statistics/index'),
      name: 'app.statistics.index',
      meta: {
        roles: ['superAdmin', 'admin'],
        title: 'statisticsIndex',
        group: 'paper',
        name: '人员报告'
      }
    },
    {
      path: 'paper',
      component: () => import('@/views/statistics/paper'),
      name: 'app.statistics.paper',
      meta: {
        roles: ['superAdmin', 'admin'],
        title: 'statisticsPaper',
        group: 'paper',
        name: '试卷报告'
      }
    }
    ]
  }
]

export default statisticsRouterMap
