const createPostPage = () =>
  import(
    /* webpackChunkName: "createPostPage" */ "@/pages/createPost/CreatePostPage.vue"
  );
const postEditPage = () =>
  import(
    /* webpackChunkName: "postEditPage" */ "@/pages/profile/components/EditPostPage.vue"
  );

export default [
  {
    path: "/create",
    name: "create",
    component: createPostPage,
    props: true,
  },
  {
    path: "/post/edit/:postId",
    name: "post-edit",
    component: postEditPage,
    props: true,
  },
];
