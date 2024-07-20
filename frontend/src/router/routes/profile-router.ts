const profilePage = () =>
  import(
    /* webpackChunkName: "profilePage" */ "@/components/Profile/profilePage.vue"
  );

export default [
  {
    path: "/profile/:userId",
    name: "profile",
    component: profilePage,
    props: true,
  },
];
