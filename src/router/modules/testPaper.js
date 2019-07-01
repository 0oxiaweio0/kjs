/**
 * Created by xiawei on 2018/9/15.
 */
import Layout from '@/views/layout/Layout'

const testPaperRouterMap = [
  /* 试卷管理 */
  {
    path: '/paper',
    redirect: '/paper/home',
    component: Layout,
    name: 'app.paper',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'testPaper',
      name: '试卷阅读',
      group: 'paper',
      icon: 'home'
    },
    children: [{
      path: 'home',
      component: () => import('@/views/testPaper/index'),
      name: 'app.testPaper.home',
      meta: {
        roles: ['superAdmin', 'admin'],
        icon: 'home',
        title: 'testPaperIndex',
        group: 'paper',
        name: '试卷阅读',
        home: true
      }
    }]
  },
  {
    path: '/testPaper',
    redirect: '/testPaper/index',
    component: Layout,
    name: 'app.testPaper',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'testPaper',
      name: '试卷管理',
      group: 'paper',
      icon: 'paper'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/testPaper/index'),
      name: 'app.testPaper.index',
      meta: {
        roles: ['superAdmin', 'admin'],
        icon: 'paper',
        title: 'testPaperIndex',
        group: 'paper',
        name: '试卷管理'
      }
    }, {
      path: 'list/:level/:class/:type',
      component: () => import('@/views/testPaper/list'),
      name: 'app.testPaper.list',
      hidden: true,
      meta: {
        roles: ['superAdmin', 'admin'],
        title: 'testPaperList',
        group: 'paper',
        name: '试卷列表'
      }
    }, {
      path: 'paperAdd/:level/:class/:type',
      component: () => import('@/views/testPaper/paperAdd'),
      name: 'app.testPaper.paperAdd',
      meta: {
        roles: ['superAdmin', 'admin'],
        title: 'testPaperAdd',
        group: 'paper',
        name: '试卷添加'
      },
      hidden: true
    },
    {
      path: 'paperEdit/:level/:class/:type/:id',
      component: () => import('@/views/testPaper/paperAdd'),
      name: 'app.testPaper.paperEdit',
      meta: {
        roles: ['superAdmin', 'admin'],
        title: 'testPaperEdit',
        group: 'paper',
        name: '试卷修改'
      },
      hidden: true
    }
    ]
  }
]

export default testPaperRouterMap
