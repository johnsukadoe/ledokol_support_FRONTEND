const homepage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/Homepage/homepage.vue"
        );
const createPost = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/createPost/createPost.vue"
        );

export default[
    {
        path: '/home/',
        name: 'Homepage',
        component: homepage,
        props:true,
    },
    {
        path:'/create/',
        name:"create",
        component: createPost,
        props:true,
    }
];
