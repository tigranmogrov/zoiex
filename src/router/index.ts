import HomeView from '../views/HomeView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/giphy/:id',
      name: 'giphy',
      meta: {
        layout: 'empty'
      },
      component: () => import('@/views/GiphyView.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      meta: {
        layout: 'empty'
      },
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      meta: {
        layout: 'empty'
      },
      component: () => import('@/views/404.vue')
    }
  ]
});

export default router;
