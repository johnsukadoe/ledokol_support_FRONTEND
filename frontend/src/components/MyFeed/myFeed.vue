<script>
import MainPosts from "@/components/main-posts.vue";

export default {
  name: "myFeed",
  components: { MainPosts },
  data() {
    return {
      filters: {
        user_id: this.user_id(),
        isProfile: false,
      },
      lang: "",
    };
  },
  mounted() {
    this.filters = {
      user_id: this.user_id(),
    };
    console.log(localStorage.getItem("lang"));

    this.lang = localStorage.getItem("lang");
  },
  methods: {
    user_id() {
      let value = localStorage.getItem("user_id");
      return value;
    },
    editLang(lang) {
      console.log(lang);
      this.lang = lang;
    },
  },
};
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <main-posts :filters="filters" :lang="lang"></main-posts>
  </div>
</template>

<style lang="scss" scoped></style>
