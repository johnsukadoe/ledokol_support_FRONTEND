const recommendationsPage = () =>
	import(
		/* webpackChunkName: "recommendations" */ "@/components/Homepage/homepage.vue"
		);


export default [
	{
		path: '/recommendations',
		name: 'homepage',
		component: recommendationsPage,
		props:true,
	},
]