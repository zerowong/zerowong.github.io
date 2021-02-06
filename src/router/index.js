import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notification } from 'element-ui'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/blog',
      component: () => import('@/pages/Blog.vue'),
    },
    {
      path: '/about',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/manager',
      component: () => import('@/pages/Manager.vue'),
      beforeEnter(to, from, next) {
        if (store.state.user?.role === 'admin') {
          next()
        } else {
          next(new Error('你没有权限'))
        }
      },
    },
    {
      path: '*',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})

router.onError((err) => {
  Notification({ type: 'error', message: err.message, position: 'bottom-right' })
})

export default router
