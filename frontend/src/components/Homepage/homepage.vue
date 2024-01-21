<script>
import {getUser} from '@/api/homepageUser';
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import HomepageRecentActions from "@/components/Homepage/components/homepage-recent-actions.vue";
import HomepagePosts from "@/components/Homepage/components/homepagePosts.vue";
export default {
  name: "homepage.vue",
  components: {HomepagePosts, HomepageRecentActions, HomepageHeader},
  props: ['id'],
  data(){
    return{
      user_id:null
    }
  },
  async mounted() {
    const data = await getUser(this.user_id)
    this.user_id = this.userId;
  },
  computed:{
    userId() {
      return this.$store.getters.getUserId
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'recommendations'" style="position: fixed"></homepage-header>
    <div class="flex flex-row justify-around mt-5">
      <homepage-posts></homepage-posts>
      <homepage-recent-actions></homepage-recent-actions>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>