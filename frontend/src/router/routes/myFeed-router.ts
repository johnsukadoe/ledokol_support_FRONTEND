const MyFeedPage = () =>
  import(/* webpackChunkName: "MyFeedPage" */ "@/pages/myFeed/MyFeedPage.vue");

export default [
  {
    path: "/myfeed",
    name: "myfeed",
    component: MyFeedPage,
    props: true,
  },
];
