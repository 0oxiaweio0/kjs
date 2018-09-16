/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const personnelRouterMap = [
  /* 人员管理 */
  {
    path: '/personnel',
    redirect: '/personnel/index',
    component: Layout,
    name: 'app.personnel',
    roles: ['superAdmin'],
    meta: {
      title: 'personnel',
      name: '人员管理',
      group: 'personnel'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/personnel/index'),
      name: 'app.personnel.index',
      roles: ['superAdmin'],
      meta: {
        icon: 'person',
        title: 'personnelIndex',
        group: 'testPaper',
        name: '人员管理'
      }
    }
    ]
  }
]

export default personnelRouterMap
