<script lang="ts">
import { getAllPosts } from "@/api/apiPost.ts";
import PanelPost from "@/components/PanelPost.vue";
import type { IPost } from "@/types/IPost.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: { PanelPost },
  data() {
    return {
      posts: [] as IPost[],
    };
  },
  async mounted() {
    const data = await getAllPosts();

    this.posts = data;
  },
});
</script>

<template>
  <div class="mt-5">
    <Panel header="Рекомендация" class="flex flex-col gap-5">
      <div v-for="post in posts">
        <PanelPost :post="post" class="w-1/2"></PanelPost>
      </div>
    </Panel>
  </div>
</template>

<style scoped lang="scss"></style>
