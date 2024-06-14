import adminRouter from '@/router/routes/admin-router.js'
import createRouter from '@/router/routes/createPost-router.js'
import myFeedRouter from '@/router/routes/myFeed-router.js'
import profileRouter from '@/router/routes/profile-router.js'
import recommendationsRouter from '@/router/routes/recommendations-router.js'
import settingsRouter from '@/router/routes/settings-router.js'
import subscriptionsRouter from '@/router/routes/subscriptions-router.js'

const nullPage = () =>
  import(
    /* webpackChunkName: "nullPage" */ "@/components/nullPage.vue"
    );
const headerPage = () =>
  import(
    /* webpackChunkName: "headerPage" */ "@/components/Homepage/components/homepage-header.vue"
    );
export default[
    {
        path: '',
        name: 'nullpage',
        component: nullPage,
        children:[
            {
                path: '',
                name: 'header',
                component: headerPage,
                children:[
                    ...recommendationsRouter,
                    ...myFeedRouter,
                    ...subscriptionsRouter,
                    ...createRouter,
                    ...profileRouter,
                    ...settingsRouter,
                    ...adminRouter
                ]
            },
        ]
    },
    
];



