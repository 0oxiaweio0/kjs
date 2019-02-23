/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const testPaperRouterMap = [
  /* 试卷管理 */
  {
    path: '/testPaper',
    redirect: '/testPaper/index',
    component: Layout,
    name: 'app.testPaper',
    roles: ['superAdmin'],
    meta: {
      title: 'testPaper',
      name: '试卷管理',
      group: 'testPaper',
      icon: 'paper'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/testPaper/index'),
      name: 'app.testPaper.index',
      roles: ['superAdmin'],
      meta: {
        icon: 'paper',
        title: 'testPaperIndex',
        group: 'testPaper',
        name: '试卷管理'
      }
    }, {
      path: 'list/:class/:type',
      component: () => import('@/views/testPaper/list'),
      name: 'app.testPaper.list',
      hidden: true,
      roles: ['superAdmin'],
      meta: {
        title: 'testPaperList',
        group: 'testPaper',
        name: '试卷列表'
      }
    }, {
      path: 'paperAdd',
      component: () => import('@/views/testPaper/paperAdd'),
      name: 'app.testPaper.paperAdd',
      roles: ['superAdmin'],
      meta: {
        title: 'testPaperAdd',
        group: 'testPaper',
        name: '试卷添加'
      },
      hidden: true
    }
    ]
  }
]

export default testPaperRouterMap
