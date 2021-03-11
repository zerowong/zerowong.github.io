import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/Home.vue'),
      meta: { transition: 'MTBFB' },
    },
    {
      path: '/posts',
      component: () => import('../pages/Posts.vue'),
    },
    {
      path: '/about',
      component: () => import('../pages/About.vue'),
    },
    {
      path: '/manager',
      component: () => import('../pages/Manager.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
