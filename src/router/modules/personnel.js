/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const personnelRouterMap = [
  /* 人员管理 */
  {
    path: '/personnel',
    component: Layout,
    redirect: '/personnel/school',
    name: 'app.personnel',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'personnel',
      name: '人员管理',
      group: 'paper',
      icon: 'person'
    },
    children: [
      {
        path: 'school',
        component: () => import('@/views/personnel/school'),
        name: 'app.personnel.school',
        meta: {
          roles: ['superAdmin', 'admin'],
          title: 'personnelSchoolManage',
          group: 'paper',
          name: '学校管理'
        }
      },
      {
        path: 'class',
        component: () => import('@/views/personnel/class'),
        name: 'app.personnel.class',
        meta: {
          roles: ['superAdmin', 'admin'],
          title: 'personnelClassManage',
          group: 'paper',
          name: '班级管理'
        }
      },
      {
        path: 'teacher',
        component: () => import('@/views/personnel/teacher'),
        name: 'app.personnel.teacher',
        meta: {
          roles: ['superAdmin', 'admin'],
          title: 'personnelTeacherManage',
          group: 'paper',
          name: '教师管理'
        }
      }
    ]
  }
]

export default personnelRouterMap
