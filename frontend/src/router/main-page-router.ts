const MainPageComponent = () =>
  import(
    /* webpackChunkName: "SurveyExperienceMain" */ "@/public/PublicPage.vue"
  );
const signComponent = () =>
  import(
    /* webpackChunkName: "SurveyExperienceMain" */ "@/public/AuthPage.vue"
  );

export default [
  {
    path: "/",
    name: "MainPage",
    component: MainPageComponent,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: signComponent,
  },
];
