<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import {createPost} from "@/api/createPost.js"
import PostOperations from "@/components/postOperations.vue";
export default {
  name: "createPost",
  components: {PostOperations, HomepageHeader},
  data(){
    return{
    }
  },
  mounted() {
    console.log(this.$store.state.userid)
  },
  computed:{
    user_id() {
      return this.$store.state.userid;
    }
  },
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'create'"></homepage-header>
    <post-operations></post-operations>
  </div>
</template>

<style scoped lang="scss">

</style>