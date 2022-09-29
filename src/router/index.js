import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GoodsInfo from '../views/GoodsInfo.vue'
import OrderInfo from  '../views/OrderInfo.vue'
import AddGoods from  '../views/AddGoods.vue'
import LoginPage from '../views/Login.vue'
import QrcodeReader from '../views/QrcodeReader.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/GoodsInfo',
    name: 'GoodsInfo',
    component: GoodsInfo
  },
  {
    path: '/OrderInfo',
    name: 'OrderInfo',
    component: OrderInfo
  },
  {
    path: '/AddGoods',
    name: 'AddGoods',
    component: AddGoods
  },
  {
    path: '/qrcode',
    name: 'QrcodeReader',
    component: QrcodeReader
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  //每次跳轉頁面回到最上層
  scrollBehavior(to,from,savedPosition) {
    if(savedPosition) {
      return savedPosition
    }else{
      return {top:0}
    }
  }
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token');
  if(to.name !=='login' && !isLogin){
    next("/login")
  } else {
    next()
  }
})

export default router
