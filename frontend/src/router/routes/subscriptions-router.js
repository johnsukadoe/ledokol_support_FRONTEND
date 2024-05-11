const subscriptionsPage = () =>
	import(
		/* webpackChunkName: "subscriptionsPage" */ "@/components/Homepage/homepage.vue"
		);

  
export default [
	{
		path: '/subscriptions',
		name: 'subscriptions',
		component: subscriptionsPage,
		props:true,
	},
]