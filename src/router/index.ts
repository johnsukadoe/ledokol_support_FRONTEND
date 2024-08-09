import homepageRouter from "@/router/homepage-router.ts";
import publicPageRouter from "@/router/public-page-router.ts";
import { createRouter, createWebHistory } from "vue-router";

const routes = [...publicPageRouter, ...homepageRouter];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
