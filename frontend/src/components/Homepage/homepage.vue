<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import HomepageRecentActions from "@/components/Homepage/components/homepage-recent-actions.vue";
import MainPosts from "@/components/main-posts.vue";
export default {
  name: "homepage.vue",
  components: {MainPosts, HomepageRecentActions, HomepageHeader},
  data(){
    return{
      user_id:null,

      lang:'',
    }
  },
  async mounted() {
    this.user_id = this.userId;

    this.lang = localStorage.getItem('lang')
  },
  methods:{
    editLang(lang){
      this.lang = lang;
    }
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
    <homepage-header :activeLink="'recommendations'" @editLang="editLang"></homepage-header>
    <div class="flex flex-row justify-around mt-5">
      <main-posts :lang="lang"></main-posts>
      <homepage-recent-actions :lang="lang"></homepage-recent-actions>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>