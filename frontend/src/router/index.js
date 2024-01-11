import { createRouter, createWebHistory } from 'vue-router';

// Import individual route files
import mainPageRoutes from './main-page-router';

const routes = [
  // Other routes can be added here if needed
  ...mainPageRoutes,
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHashHistory() for hash mode
  routes,
});

export default router;
