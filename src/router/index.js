import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/Login'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard'
    }]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/baseinfo',
    name: '客户管理',
    // meta: { title: 'Example', icon: 'example' },
    meta: { title: '客户管理', icon: 'icon-fenleiorguangchangorqitatianchong' },
    children: [
      {
        path: 'baseinfo',
        name: '客户列表',
        meta: { title: '客户列表' }
      },
      {
        path: 'contractinfo',
        name: '合同列表',
        meta: { title: '合同列表' }
      }
    ]
  },

  {
    path: '/poi',
    component: Layout,
    redirect: '/poi/physicalpoilist',
    name: '门店管理',
    // meta: { title: 'Example', icon: 'example' },
    meta: { title: '门店管理', icon: 'icon-fenleiorguangchangorqitatianchong' },
    children: [
      {
        path: 'physicalpoilist',
        name: '物理门店列表',
        meta: { title: '物理门店列表' }
      },
      {
        path: 'physicalpoi',
        name: '我的物理门店',
        meta: { title: '我的物理门店' }
      },
      {
        path: 'wmpoilist',
        name: '外卖门店列表',
        meta: { title: '外卖门店列表' }
      },
      {
        path: 'wmpoi',
        name: '我的外卖门店',
        meta: { title: '我的外卖门店' }
      }
    ]
  },

  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/alltasks',
    name: '审核管理',
    meta: {
      title: '审核管理',
      icon: 'icon-wenbenbianjitianchong'
    },
    children: [
      {
        path: 'alltasks',
        name: '所有任务',
        meta: { title: '所有任务' }
      },
      {
        path: 'tasks',
        name: '个人任务',
        meta: { title: '个人任务' }
      }
    ]
  },

  {
    path: '/upm',
    component: Layout,
    redirect: '/upm/user',
    name: '权限管理',
    meta: {
      title: '权限管理',
      icon: 'icon-wenbenbianjitianchong'
    },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/pages/upm/userManager'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/pages/upm/roleManager'),
        meta: { title: '角色管理' }
      },
      {
        path: 'resource',
        name: '资源管理',
        component: () => import('@/views/pages/upm/resourceManager'),
        meta: { title: '资源管理' }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
