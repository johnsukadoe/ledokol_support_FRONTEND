const MyFeedPage = () =>
	import(
		/* webpackChunkName: "MyFeedPage" */ "@/components/MyFeed/myFeed.vue"
		);


export default [
	{
	    path: '/myfeed',
	    name: 'myfeed',
	    component: MyFeedPage,
	    props:true,
	},
];
