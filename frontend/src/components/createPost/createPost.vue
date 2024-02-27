<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import {createPost} from "@/api/createPost.js"
import PostOperations from "@/components/postOperations.vue";
export default {
  name: "createPost",
  components: {PostOperations, HomepageHeader},
  data(){
    return{
      lang:'',
    }
  },
  mounted(){
    this.lang = localStorage.getItem('lang')
  },
  methods:{
    editLang(lang){
      console.log(lang)
      this.lang = lang;
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'create'" @editLang="editLang"></homepage-header>
    <post-operations :lang="lang"></post-operations>
  </div>
</template>

<style scoped lang="scss">

</style>