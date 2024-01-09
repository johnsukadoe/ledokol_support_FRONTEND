import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../components/MainPage/MainPageComponent.vue'), 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
