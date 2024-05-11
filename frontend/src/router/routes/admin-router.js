const admin = () =>
	import(
		/* webpackChunkName: "admin" */ "@/components/admin/adminPage.vue"
		);

export default [
	{
		path: '/admin',
		name: 'admin',
		component: admin,
		props:true,
	},
]