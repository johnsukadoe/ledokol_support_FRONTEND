const homepage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/Homepage/homepage.vue"
        );
const createPost = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/createPost/createPost.vue"
        );
const subscriptionsPage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/Subscriptions/subscriptionsPage.vue"
        );
const myfeedPage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/MyFeed/myFeed.vue"
        );

export default[
    {
        path: '/home',
        name: 'homepage',
        component: homepage,
        props:true,
    },
    {
        path:'/create',
        name:"create",
        component: createPost,
        props:true,
    },
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: subscriptionsPage,
        props:true,
    },
    {
        path: '/myfeed',
        name: 'myfeed',
        component: myfeedPage,
        props:true,
    },
];
