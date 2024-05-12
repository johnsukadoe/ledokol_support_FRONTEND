const subscriptionsPage = () =>
	import(
		/* webpackChunkName: "subscriptionsPage" */ "@/components/Subscriptions/subscriptionsPage.vue"
		);

  
export default [
	{
		path: '/subscriptions',
		name: 'subscriptions',
		component: subscriptionsPage,
		props:true,
	},
]