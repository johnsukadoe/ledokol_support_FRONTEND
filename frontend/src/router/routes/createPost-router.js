const createPostPage = () =>
	import(
		/* webpackChunkName: "createPostPage" */ "@/components/createPost/createPost.vue"
		);
const postEditPage = () =>
	import(
		/* webpackChunkName: "postEditPage" */ "@/components/Profile/components/editPostPage.vue"
		);

export default [
	{
		path:'/create',
		name:"create",
		component: createPostPage,
		props:true,
	},
	{
		path: '/post/edit/:postId',
		name: 'post-edit',
		component: postEditPage,
		props:true,
	},
]