/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const personnelRouterMap = [
  /* 人员管理 */
  {
    path: '/personnel',
    component: Layout,
    redirect: 'noredirect',
    name: 'app.personnel',
    roles: ['superAdmin'],
    meta: {
      title: 'personnel',
      name: '人员管理',
      group: 'personnel',
      icon: 'person'
    },
    children: [
      {
        path: 'school',
        component: () => import('@/views/personnel/component/school'),
        name: 'app.personnel.school',
        roles: ['superAdmin'],
        meta: {
          title: 'personnelSchoolManage',
          group: 'personnel',
          name: '学校管理'
        }
      },
      {
        path: 'class',
        component: () => import('@/views/personnel/component/class'),
        name: 'app.personnel.class',
        roles: ['superAdmin'],
        meta: {
          title: 'personnelClassManage',
          group: 'personnel',
          name: '班级管理'
        }
      },
      {
        path: 'teacher',
        component: () => import('@/views/personnel/component/teacher'),
        name: 'app.personnel.teacher',
        roles: ['superAdmin'],
        meta: {
          title: 'personnelTeacherManage',
          group: 'personnel',
          name: '教师管理'
        }
      }
    ]
  }
]

export default personnelRouterMap
