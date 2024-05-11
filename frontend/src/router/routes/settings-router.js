const settingsPage = () =>
	import(
		/* webpackChunkName: "settings" */ "@/components/settings/settings.vue"
		);

export default [
	{
		path: '/settings/:userId',
		name: 'settings',
		component: settingsPage,
		props:true,
	},
]