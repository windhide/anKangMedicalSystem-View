import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import rootViews from '@/views/mainViews/rootViews.vue'
import staffViews from '@/views/mainViews/staffViews.vue'
import userViews from '@/views/mainViews/userViews.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/staff',
    name: 'staffViews',
    component: staffViews,
  },
  {
    path: '/root',
    name: 'rootViews',
    component: rootViews,
    children: [
      {
        path: '/drugs',
        name: '药物管理',
        component: rootViews,
        children: [
          {
            path: '/main',
            name: '药品信息',
            component: rootViews,
          }, {
            path: '/type',
            name: '药品类型信息',
            component: rootViews,
          }, {
            path: '/unit',
            name: '药品规格单位信息',
            component: rootViews,
          }
        ]
      },
      {
        path: '/staff',
        name: '员工管理',
        component: rootViews,
        children: [
          {
            path: '/main',
            name: '员工信息',
            component: rootViews,
          }, {
            path: '/pharmacy',
            name: '药房信息',
            component: rootViews,
          }, {
            path: '/authority',
            name: '权限信息',
            component: rootViews,
          }, {
            path: '/operator',
            name: '药房操作记录',
            component: rootViews,
          }, {
            path: '/operatorType',
            name: '药房操作类型',
            component: rootViews,
          }
        ]
      },
      {
        path: '/wareHouse',
        name: '仓库管理',
        component: rootViews,
        children: [
          {
            path: '/main',
            name: '仓库信息',
            component: rootViews,
          }, {
            path: '/type',
            name: '仓库类型信息',
            component: rootViews,
          }, {
            path: '/record',
            name: '仓库操作记录',
            component: rootViews,
          }
        ]
      },
      {
        path: '/user',
        name: '用户管理',
        component: rootViews,
        children: [
          {
            path: '/main',
            name: '用户信息',
            component: rootViews,
          }, {
            path: '/levelType',
            name: '用户VIP等级管理',
            component: rootViews,
          }, {
            path: '/record',
            name: '用户购买记录',
            component: rootViews,
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'userViews',
    component: userViews,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
