const nullPage = () =>
  import(/* webpackChunkName: "nullPage" */ "@/components/RouterPage.vue");
const studioNav = () =>
  import(
    /* webpackChunkName: "studioNav" */ "@/pages/studio/components/StudioNav.vue"
  );
const studioContents = () =>
  import(
    /* webpackChunkName: "studioContent" */ "@/pages/studio/components/StudioContents.vue"
  );
const studioAnalytics = () =>
  import(
    /* webpackChunkName: "studioAnalytics" */ "@/pages/studio/components/StudioAnalytics.vue"
  );
const studioEarn = () =>
  import(
    /* webpackChunkName: "studioEarn" */ "@/pages/studio/components/StudioEarn.vue"
  );

export default [
  {
    path: "/studio",
    name: "studioWrapper",
    component: nullPage,
    props: true,
    redirect: { name: "contents" },

    children: [
      {
        path: "",
        component: studioNav,
        name: "studioNav",
        redirect: { name: "contents" },
        children: [
          {
            path: "contents",
            name: "contents",
            component: studioContents,
            props: true,
          },
          {
            path: "analytics",
            name: "analytics",
            component: studioAnalytics,
            props: true,
          },
          {
            path: "earn",
            name: "earn",
            component: studioEarn,
            props: true,
          },
        ],
      },
    ],
  },
];
