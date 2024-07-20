import homepageRouter from "@/router/homepage-router.ts";

import mainPageRouter from "@/router/main-page-router.ts";
import { createRouter, createWebHistory } from "vue-router";

const routes = [...mainPageRouter, ...homepageRouter];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
