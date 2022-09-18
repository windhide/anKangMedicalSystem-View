import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import rootViews from '@/views/mainViews/rootViews.vue'
import staffViews from '@/views/mainViews/staffViews.vue'
import userViews from '@/views/mainViews/userViews.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/staff',
    name: 'staffViews',
    component: staffViews,
  },
  {
    path: '/root',
    name: 'rootViews',
    component: rootViews,
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
