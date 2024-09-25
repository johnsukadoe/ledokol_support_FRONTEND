const admin = () =>
  import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminPage.vue");

export default [
  {
    path: "/admin",
    name: "admin",
    component: admin,
    props: true,
  },
];
