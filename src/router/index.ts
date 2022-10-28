import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import rootViews from '@/views/rootViews.vue'
import staffViews from '@/views/staffViews.vue'
import drugs from '@/components/root/drugs/drugs.vue'
import drugsType from '@/components/root/drugs/drugsType.vue'
import drugsUnit from '@/components/root/drugs/drugsUnit.vue'
import staff from '@/components/root/staff/staff.vue'
import pharmacy from '@/components/root/staff/pharmacy.vue'
import authority from '@/components/root/staff/authority.vue'
import operatorType from '@/components/root/staff/operatorType.vue'
import operator from '@/components/root/staff/operator.vue'
import warehouseType from '@/components/root/warehouse/warehouseType.vue'
import warehouse from '@/components/root/warehouse/warehouse.vue'
import warehouseStaffRecord from '@/components/root/warehouse/warehouseStaffRecord.vue'
import userLevelType from '@/components/root/user/userLevelType.vue'
import user from '@/components/root/user/user.vue'
import symptom from '@/components/root/user/symptom.vue'
import purchaseRecord from '@/components/root/user/purchaseRecord.vue'
import rootLogin from '@/views/rootLoginViews.vue'
// 以上是后台的导入组件component   
import userViews from '@/views/userViews.vue'
import userLoginViews from  "@/views/userLoginViews.vue"


export const routes: Array<RouteRecordRaw> = [
  {
    path: '/rootLogin',
    name: 'rootLogin',
    component: rootLogin,
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: userLoginViews,
  },
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
        path: 'drugs',
        name: '药物管理',
        props: {
          icon: 'FirstAidKit',
        },
        children: [
          {
            path: 'main',
            name: '药品信息',
            component: drugs,
            props: {
              icon: 'SuitcaseLine',
            },
          }, {
            path: 'type',
            name: '药品类型信息',
            component: drugsType,
            props: {
              icon: 'Histogram',
            },
          }, {
            path: 'unit',
            name: '药品规格单位信息',
            component: drugsUnit,
            props: {
              icon: 'InfoFilled',
            },
          }
        ]
      },
      {
        path: 'staff',
        name: '员工管理',
        props: {
          icon: 'Platform',
        },
        children: [
          {
            path: 'main',
            name: '员工信息',
            component: staff,
            props: {
              icon: 'PictureRounded',
            },
          }, {
            path: 'pharmacy',
            name: '药房信息',
            component: pharmacy,
            props: {
              icon: 'FirstAidKit',
            },
          }, {
            path: 'authority',
            name: '权限信息',
            component: authority,
            props: {
              icon: 'Opportunity',
            },
          }, {
            path: 'operator',
            name: '药房操作记录',
            component: operator,
            props: {
              icon: 'Flag',
            },
          }, {
            path: 'operatorType',
            name: '药房操作类型',
            component: operatorType,
            props: {
              icon: 'Stopwatch',
            },
          }
        ]
      },
      {
        path: 'wareHouse',
        name: '仓库管理',
        props: {
          icon: 'SuitcaseLine',
        },
        children: [
          {
            path: 'main',
            name: '仓库信息',
            component: warehouse,
            props: {
              icon: 'Box',
            },
          }, {
            path: 'type',
            name: '仓库类型信息',
            component: warehouseType,
            props: {
              icon: 'Document',
            },
          }, {
            path: 'record',
            name: '仓库操作记录',
            component: warehouseStaffRecord,
            props: {
              icon: 'Coin',
            },
          }
        ]
      },
      {
        path: 'user',
        name: '用户管理',
        props: {
          icon: 'Medal',
        },
        children: [
          {
            path: 'main',
            name: '用户信息',
            component: user,
            props: {
              icon: 'User',
            },
          }, {
            path: 'levelType',
            name: '用户VIP等级管理',
            component: userLevelType,
            props: {
              icon: 'Guide',
            },
          }, {
            path: 'record',
            name: '用户购买记录',
            component: purchaseRecord,
            props: {
              icon: 'ShoppingCartFull',
            },
          }, {
            path: 'symptom',
            name: '用户诊断记录',
            component: symptom,
            props: {
              icon: 'CirclePlusFilled',
            },
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
