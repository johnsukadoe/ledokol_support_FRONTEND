<script lang="ts">
import PostOperations from "@/components/PostForm.vue";
import MainPosts from "@/components/PostsList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditPostPage",
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
