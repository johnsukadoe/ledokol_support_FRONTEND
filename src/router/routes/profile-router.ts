const profilePage = () =>
  import(
    /* webpackChunkName: "profilePage" */ "@/pages/profile/ProfilePage.vue"
  );

export default [
  {
    path: "/profile/:userId",
    name: "profile",
    component: profilePage,
    props: true,
  },
];
