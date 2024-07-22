import adminRouter from "@/router/routes/admin-router.ts";
import createRouter from "@/router/routes/createPost-router.ts";
import myFeedRouter from "@/router/routes/myFeed-router.ts";
import profileRouter from "@/router/routes/profile-router.ts";
import recommendationsRouter from "@/router/routes/recommendations-router.ts";
import settingsRouter from "@/router/routes/settings-router.ts";
import subscriptionsRouter from "@/router/routes/subscriptions-router.ts";

const nullPage = () =>
  import(/* webpackChunkName: "nullPage" */ "@/components/RouterPage.vue");
const headerPage = () =>
  import(
    /* webpackChunkName: "headerPage" */ "@/pages/homepage/components/HomePageNav.vue"
  );
export default [
  {
    path: "",
    name: "nullpage",
    component: nullPage,
    children: [
      {
        path: "",
        name: "header",
        component: headerPage,
        children: [
          ...recommendationsRouter,
          ...myFeedRouter,
          ...subscriptionsRouter,
          ...createRouter,
          ...profileRouter,
          ...settingsRouter,
          ...adminRouter,
        ],
      },
    ],
  },
];
