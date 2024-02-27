<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import MainPosts from "@/components/main-posts.vue";

export default {
  name: "myFeed",
  components: {MainPosts, HomepageHeader},
  data(){
    return {
      filters:{
        user_id: this.user_id(),
        isProfile: false,

      },
      lang:'',
    }
  },
  mounted(){
    this.filters={
      user_id: this.user_id()
    }
    console.log(localStorage.getItem('lang'))

    this.lang = localStorage.getItem('lang')

  },
  methods:{
    user_id(){
      let value = localStorage.getItem('user_id');
      return value
    },
    editLang(lang){
      console.log(lang)
      this.lang = lang;
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'myfeed'" @editLang="editLang"></homepage-header>

    <main-posts :filters="filters" :lang="lang"></main-posts>
  </div>
</template>

<style scoped lang="scss">

</style>