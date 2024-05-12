const recommendationsPage = () =>
	import(
		/* webpackChunkName: "recommendationsPage" */ "@/components/Homepage/homepage.vue"
		);


export default [
	{
		path: '/recommendations',
		name: 'recommendations',
		component: recommendationsPage,
		props:true,
	},
]