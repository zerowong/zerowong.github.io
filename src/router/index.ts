import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/Home.vue'),
      meta: { index: 0 }
    },
    {
      path: '/posts',
      component: () => import('../pages/Posts.vue'),
      meta: { index: 1 }
    },
    {
      path: '/about',
      component: () => import('../pages/About.vue'),
      meta: { index: 2 }
    },
    {
      path: '/manager',
      component: () => import('../pages/Manager.vue'),
      meta: { index: 3 }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.afterEach((to, from) => {
  if (to.path === '/' || from.path === '/') {
    to.meta.transition = 'moveToBottomFromBottom'
    return
  }
  const toIndex = to.meta.index as number
  const fromIndex = from.meta.index as number
  if (toIndex > fromIndex) {
    to.meta.transition = 'moveFromRightToLeft'
  } else {
    to.meta.transition = 'moveFromLeftToRight'
  }
})

export default router
