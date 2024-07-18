import { createRouter, createWebHistory } from "vue-router";

import mainPageRouter from "@/router/main-page-router.js";
import homepageRouter from "@/router/homepage-router.js";
const routes = [...mainPageRouter, ...homepageRouter];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
