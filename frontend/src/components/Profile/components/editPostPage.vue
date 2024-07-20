<script lang="ts">
import MainPosts from "@/components/main-posts.vue";
import PostOperations from "@/components/postOperations.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "editPostPage",
  components: { PostOperations, MainPosts },
});
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <div>
      <post-operations
        :isEdit="true"
        :postId="$route.params.postId"
      ></post-operations>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
