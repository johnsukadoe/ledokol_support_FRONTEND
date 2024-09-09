const recommendationsPage = () =>
  import(
    /* webpackChunkName: "recommendationsPage" */ "@/pages/homepage/HomePage.vue"
  );

export default [
  {
    path: "/recommendations",
    name: "recommendations",
    component: recommendationsPage,
    props: true,
    meta: { requiresAuth: true },
  },
];
