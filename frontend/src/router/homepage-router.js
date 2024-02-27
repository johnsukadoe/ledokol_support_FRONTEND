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
const profilePage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/Profile/profilePage.vue"
        );
const postEditPage = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/Profile/components/editPostPage.vue"
        );
const settings = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/settings/settings.vue"
        );
const news = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/newsPage.vue"
        );
const admin = () =>
    import(
        /* webpackChunkName: "SurveyExperienceMain" */ "@/components/admin/adminPage.vue"
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
    {
        path: '/profile/:userId',
        name: 'profile',
        component: profilePage,
        props:true,
    },
    {
        path: '/post/edit/:postId',
        name: 'post-edit',
        component: postEditPage,
        props:true,
    },
    {
        path: '/settings/:userId',
        name: 'settings',
        component: settings,
        props:true,
    },
    {
        path: '/news',
        name: 'news',
        component: news,
        props:true,
    },
    {
        path: '/admin',
        name: 'admin',
        component: admin,
        props:true,
    },
];
