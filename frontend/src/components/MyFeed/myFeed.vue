<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import MainPosts from "@/components/main-posts.vue";

export default {
  name: "myFeed",
  components: {MainPosts, HomepageHeader},
  data(){
    return {
      filters:{
        user_id: this.user_id,
        isProfile: false,
      },
    }
  },
  mounted(){
    this.filters={
      user_id: this.user_id
    }
  },
  computed:{
    user_id() {
      return this.$store.state.userid;
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'myfeed'"></homepage-header>

    <main-posts :filters="filters"></main-posts>
  </div>
</template>

<style scoped lang="scss">

</style>