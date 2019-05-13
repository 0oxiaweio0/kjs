/**
 * Created by xiawei on 2019/02/27.
 */
import Layout from '@/views/layout/Layout'
const adminRouterMap = [
  /* 管理者管理 */
  {
    path: '/admin',
    redirect: '/admin/Manage',
    component: Layout,
    name: 'app.admin',
    meta: {
      roles: ['superAdmin'],
      title: 'admin',
      name: '管理操作'
    },
    hidden: true,
    children: [{
      path: 'Manage',
      component: () => import('@/views/admin/Manage'),
      name: 'app.admin.Manage',
      meta: {
        roles: ['superAdmin'],
        title: 'adminManage',
        name: '管理员管理'
      },
      hidden: true
    }
    ]
  }
]

export default adminRouterMap
