import Layout from '@/views/layout/Layout'

const homeRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'home',
      icon: 'home',
      group: 'home',
      name: '首页'
    },
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      name: 'home',
      meta: { roles: ['superAdmin', 'admin'], title: 'home', icon: 'home', name: '首页', group: 'home' }
    }]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/home',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'course',
      icon: 'course',
      group: 'home',
      name: '在线课程'
    },
    children: [{
      path: 'home',
      name: 'coursehome',
      meta: { roles: ['superAdmin', 'admin'], title: 'course', icon: 'home', name: '在线课程', group: 'home' }
    }]
  },
  {
    path: '/page',
    component: Layout,
    redirect: '/page/home',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'page',
      icon: 'home',
      group: 'home',
      name: '考试阅卷'
    },
    children: [{
      path: 'home',
      component: () => import('@/views/testPaper/index'),
      name: 'pagehome',
      meta: { roles: ['superAdmin', 'admin'], title: 'page', icon: 'home', name: '考试阅卷', to: 'paper', group: 'home' }
    }]
  },
  {
    path: '/hearing',
    component: Layout,
    redirect: '/hearing/home',
    meta: {
      roles: ['superAdmin', 'admin'],
      title: 'hearing',
      icon: 'home',
      group: 'home',
      name: '听力练习'
    },
    children: [{
      path: 'home',
      name: 'hearinghome',
      meta: { roles: ['superAdmin', 'admin'], title: 'hearing', icon: 'home', name: '听力练习', group: 'home' }
    }]
  }
]

export default homeRouterMap
