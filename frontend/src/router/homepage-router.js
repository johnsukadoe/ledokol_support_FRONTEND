import adminRouter from '@/router/routes/admin-router.js'
import createRouter from '@/router/routes/createPost-router.js'
import myFeedRouter from '@/router/routes/myFeed-router.js'
import profileRouter from '@/router/routes/profile-router.js'
import recommendationsRouter from '@/router/routes/recommendations-router.js'
import settingsRouter from '@/router/routes/settings-router.js'
import subscriptionsRouter from '@/router/routes/subscriptions-router.js'

export default[
    ...recommendationsRouter,
    ...myFeedRouter,
    ...subscriptionsRouter,
    ...createRouter,
    ...profileRouter,
    ...settingsRouter,
    ...adminRouter
];



