const MainPageComponent = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/MainPage/MainPageComponent.vue"
        );
const signComponent = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/SignInUp/signComponent.vue"
        );

export default[
    {
        path: '/',
        name: 'MainPage',
        component: MainPageComponent,
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: signComponent,
    },
];
