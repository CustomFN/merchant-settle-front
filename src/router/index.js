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
    redirect: '/customer/customermanager',
    name: '客户管理',
    // meta: { title: 'Example', icon: 'example' },
    meta: { title: '客户管理', icon: 'icon-fenleiorguangchangorqitatianchong' },
    children: [
      {
        path: 'customermanager',
        name: '客户列表',
        component: () => import('@/views/pages/customer/CustomerManager'),
        meta: { title: '客户列表' }
      },
      {
        path: 'contractmanager',
        name: '合同列表',
        component: () => import('@/views/pages/customer/ContractManager'),
        meta: { title: '合同列表' }
      },
      {
        path: 'customeroplog',
        name: '客户操作记录',
        component: () => import('@/views/pages/customer/CustomerOpLog'),
        hidden: true,
        meta: { title: '客户操作记录' }
      },
      {
        path: 'customerinfo',
        name: '客户信息',
        component: () => import('@/views/pages/customer/CustomerInfo'),
        hidden: true,
        meta: { title: '客户信息' }
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
        component: () => import('@/views/pages/poi/PhysicalPoiListManager'),
        meta: { title: '物理门店列表' }
      },
      {
        path: 'physicalpoi',
        name: '我的物理门店',
        component: () => import('@/views/pages/poi/PhysicalPoiManager'),
        meta: { title: '我的物理门店' }
      },
      {
        path: 'wmpoilist',
        name: '外卖门店列表',
        component: () => import('@/views/pages/poi/WmPoiListManager'),
        meta: { title: '外卖门店列表' }
      },
      {
        path: 'wmpoi',
        name: '我的外卖门店',
        component: () => import('@/views/pages/poi/WmPoiManager'),
        meta: { title: '我的外卖门店' }
      },
      {
        path: 'physicalpoiinfo',
        name: '物理门店信息',
        component: () => import('@/views/pages/poi/PhysicalPoiInfo'),
        hidden: true,
        meta: { title: '物理门店信息' }
      },
      {
        path: 'wmpoiinfo',
        name: '外卖门店信息',
        component: () => import('@/views/pages/poi/WmPoiInfo'),
        hidden: true,
        meta: { title: '外卖门店信息' }
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
        component: () => import('@/views/pages/audit/AuditTaskManager'),
        meta: { title: '所有任务' }
      },
      {
        path: 'tasks',
        name: '个人任务',
        component: () => import('@/views/pages/audit/AuditTaskHandle'),
        meta: { title: '个人任务' }
      },
      {
        path: 'auditcustomer',
        name: '客户审核',
        component: () => import('@/views/pages/audit/AuditCustomer'),
        hidden: true,
        meta: { title: '客户审核' }
      },
      {
        path: 'auditcustomerkp',
        name: '客户KP审核',
        component: () => import('@/views/pages/audit/AuditCustomerKp'),
        hidden: true,
        meta: { title: '客户KP审核' }
      },
      {
        path: 'auditcustomercontract',
        name: '客户合同审核',
        component: () => import('@/views/pages/audit/AuditCustomerContract'),
        hidden: true,
        meta: { title: '客户合同审核' }
      },
      {
        path: 'auditcustomersettle',
        name: '客户结算审核',
        component: () => import('@/views/pages/audit/AuditCustomerSettle'),
        hidden: true,
        meta: { title: '客户结算审核' }
      },
      {
        path: 'auditwmpoibaseinfo',
        name: '门店基本信息审核',
        component: () => import('@/views/pages/audit/AuditWmPoiBaseInfo'),
        hidden: true,
        meta: { title: '门店基本信息审核' }
      },
      {
        path: 'auditwmpoiqua',
        name: '门店资质信息审核',
        component: () => import('@/views/pages/audit/AuditWmPoiQua'),
        hidden: true,
        meta: { title: '门店资质信息审核' }
      },
      {
        path: 'auditwmpoideliveryinfo',
        name: '门店配送信息审核',
        component: () => import('@/views/pages/audit/AuditWmPoiDeliveryInfo'),
        hidden: true,
        meta: { title: '门店配送信息审核' }
      },
      {
        path: 'auditwmpoibusinessinfo',
        name: '门店营业信息审核',
        component: () => import('@/views/pages/audit/AuditWmPoiBusinessInfo'),
        hidden: true,
        meta: { title: '门店营业信息审核' }
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
        component: () => import('@/views/pages/upm/UserManager'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/pages/upm/RoleManager'),
        meta: { title: '角色管理' }
      },
      {
        path: 'resource',
        name: '资源管理',
        component: () => import('@/views/pages/upm/ResourceManager'),
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
