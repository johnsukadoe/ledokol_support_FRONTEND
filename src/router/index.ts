import homepageRouter from "@/router/homepage-router.ts";
import publicPageRouter from "@/router/public-page-router.ts";
import useMainStore from "@/store";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const routes = [...publicPageRouter, ...homepageRouter];
const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const main = useMainStore(pinia);
  main.hydrate();

  if (to.path === "/" && main.isLoggedIn) {
    return next("/recommendations");
  }
  console.log("main.isLoggedIn inside beforeEach:", main.isLoggedIn);
  if (to.meta.requiresAuth && !main.isLoggedIn) {
    console.log("Requires auth but not logged in, redirecting to /");
    return next("/");
  }

  next();
});

export default router;
