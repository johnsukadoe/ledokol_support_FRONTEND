const subscriptionsPage = () =>
  import(
    /* webpackChunkName: "subscriptionsPage" */ "@/pages/subscriptions/SubscriptionsPage.vue"
  );

export default [
  {
    path: "/subscriptions",
    name: "subscriptions",
    component: subscriptionsPage,
    props: true,
  },
];
