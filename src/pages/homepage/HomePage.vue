<script lang="ts">
import MainPosts from "@/components/PostsList.vue";
import HomepageRecentActions from "@/pages/homepage/components/HomePageRecentActions.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: { MainPosts, HomepageRecentActions },
  data() {
    return {
      user_id: null,

      lang: "",
    };
  },
  async mounted() {
    this.user_id = this.userId;
    this.lang = localStorage.getItem("lang");
  },
  methods: {
    editLang(lang) {
      this.lang = lang;
    },
  },
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
  },
});
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <div class="flex flex-row justify-around mt-5">
      <main-posts :lang="lang"></main-posts>
      <homepage-recent-actions :lang="lang"></homepage-recent-actions>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
