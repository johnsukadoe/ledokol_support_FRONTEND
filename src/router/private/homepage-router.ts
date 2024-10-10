import PageNotFound from "@/pages/PageNotFound.vue";
import adminRouter from "@/router/private/routes/admin-router.ts";
import profileRouter from "@/router/private/routes/profile-router.ts";
import recommendationsRouter from "@/router/private/routes/recommendations-router.ts";
import settingsRouter from "@/router/private/routes/settings-router.ts";
import subscriptionsRouter from "@/router/private/routes/subscriptions-router.ts";

const nullPage = () =>
  import(/* webpackChunkName: "nullPage" */ "@/components/RouterPage.vue");
const headerPage = () =>
  import(
    /* webpackChunkName: "headerPage" */ "@/pages/homepage/components/HomePageNav.vue"
  );
export default [
  {
    path: "/",
    redirect: { name: "navbar" },
    component: nullPage,
    children: [
      {
        path: "/",
        component: headerPage,
        name: "navbar",
        redirect: { name: "recommendations" },
        children: [
          ...recommendationsRouter,
          ...subscriptionsRouter,
          ...profileRouter,
          ...settingsRouter,
          ...adminRouter,
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
  },
];
