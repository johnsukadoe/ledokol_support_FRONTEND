<script>
import PostOperations from '@/components/postOperations.vue'

export default {
  name: "createPost",
  components: {PostOperations, },
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
    <post-operations :lang="lang"></post-operations>
  </div>
</template>

<style lang="scss" scoped>

</style>