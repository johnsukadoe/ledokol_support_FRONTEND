const PublicPage = () =>
  import(
    /* webpackChunkName: "SurveyExperienceMain" */ "@/public/PublicPage.vue"
  );
const AuthWindow = () =>
  import(
    /* webpackChunkName: "SurveyExperienceMain" */ "@/public/components/AuthWindow.vue"
  );

export default [
  {
    path: "/",
    name: "PublicPage",
    component: PublicPage,
  },
];
