import { createRouter, createWebHistory } from 'vue-router';

// Import individual route files
import mainPageRouter from "@/router/main-page-router.js";
import homepageRouter from "@/router/homepage-router.js";
const routes = [
  ...mainPageRouter,
  ...homepageRouter
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHashHistory() for hash mode
  routes,
});

export default router;
