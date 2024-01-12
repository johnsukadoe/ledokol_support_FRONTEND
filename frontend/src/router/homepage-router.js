const homepage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/Homepage/homepage.vue"
        );

export default[
    {
        path: '/home/:id',
        name: 'Homepage',
        component: homepage,
        props:true,
    },
];
