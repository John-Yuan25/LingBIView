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
    component: () => import('../view/itemPage/item.vue')
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

//路由守卫
router.beforeEach((to,from,next)=>{
  //验证token，只有存在token的时候，才能跳转到工作区
  let token=sessionStorage.getItem("token")
  if(token || to.path==='/'){
    next();
  }else{
    next('/')
    alert('请先登录')
  }

})

export default router
