/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const personnelRouterMap = [
  /* 人员管理 */
  {
    path: '/personnel',
    redirect: '/personnel/manage',
    component: Layout,
    name: 'app.personnel',
    roles: ['superAdmin'],
    meta: {
      title: 'personnel',
      name: '人员管理',
      group: 'personnel'
    },
    children: [{
      path: 'manage',
      redirect: 'manage/class',
      component: () => import('@/views/personnel/index'),
      name: 'app.personnel.manage',
      roles: ['superAdmin'],
      meta: {
        icon: 'person',
        title: 'personnelIndex',
        group: 'personnel',
        name: '人员管理'
      },
      children: [
        {
          path: 'class',
          component: () => import('@/views/personnel/component/class'),
          name: 'app.personnel.manage.class',
          roles: ['superAdmin'],
          meta: {
            icon: 'person',
            title: 'personnelClassManage',
            group: 'personnel',
            name: '班级管理'
          }
        },
        {
          path: 'teacher',
          component: () => import('@/views/personnel/component/teacher'),
          name: 'app.personnel.manage.teacher',
          roles: ['superAdmin'],
          meta: {
            icon: 'person',
            title: 'personnelTeacherManage',
            group: 'personnel',
            name: '教师管理'
          }
        }
      ]
    }
    ]
  }
]

export default personnelRouterMap
