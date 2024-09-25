const settingsPage = () =>
  import(
    /* webpackChunkName: "settings" */ "@/pages/settings/SettingsPage.vue"
  );

export default [
  {
    path: "/settings/:userId",
    name: "settings",
    component: settingsPage,
    props: true,
  },
];
