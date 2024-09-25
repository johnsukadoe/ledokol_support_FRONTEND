const PublicPage = () =>
  import(
    /* webpackChunkName: "SurveyExperienceMain" */ "@/public/PublicPage.vue"
  );

export default [
  {
    path: "/",
    name: "PublicPage",
    component: PublicPage,
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];
