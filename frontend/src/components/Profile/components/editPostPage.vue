<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import MainPosts from "@/components/main-posts.vue";
import PostOperations from "@/components/postOperations.vue";

export default {
  name: "editPostPage",
  components: {PostOperations, MainPosts, HomepageHeader},
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header></homepage-header>
    <div>
      <post-operations :isEdit="true" :postId="$route.params.postId"></post-operations>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>