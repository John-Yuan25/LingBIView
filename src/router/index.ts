import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'



//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../view/login.vue')
  },
  {
    path:'/item',
    component: () => import('../view/item.vue')
  },
  {
    path:'/preview',
    component: () => import('../view/preview.vue')
  }
 ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
