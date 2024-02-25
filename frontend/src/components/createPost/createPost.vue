<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import {createPost} from "@/api/createPost.js"
export default {
  name: "createPost",
  components: {HomepageHeader},
  data(){
    return{
      post:{
        user_id:null,
        title:'',
        description:"",
        timestamp:Math.floor(Date.now() / 1000),
        preview:[
          '',''
        ]
      }
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
  methods:{
    async createPost(){
      this.post.user_id = this.user_id
      console.log(this.post)
      console.log(this.post.title)
      console.log(this.post.description)
      if(this.post.title.length===0 || this.post.description.length === 0){
        this.$message.error('Заполните данные')
      }else{
        const data = await createPost(this.post);
        this.$message.success('Успешно');
        console.log(data, 'dwijvw0vi')
      }
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'create'"></homepage-header>
    <div class="my-4">
      <h1 class="text-3xl font-medium mx-4">Создание поста</h1>
      <div class="flex justify-around">
        <div class="flex flex-col justify-start items-start align-middle gap-4 my-4">
          <el-input v-model="post.title" placeholder="Заголовок поста" style="width: 700px;" size="large" required></el-input>
          <el-input
              v-model="post.description"
              :rows="4"
              type="textarea"
              placeholder="Описание поста"
              style="width: 700px"
              required
          />
          <el-button size="large" @click="createPost">Создать пост</el-button>
        </div>
        <div style="width: 300px; " >
          <img src="@/assets/createPost.jpg" alt="" style="border-radius: 7px">
          <h2 class="text-2xl font-medium">Принеси в мир что-то свое</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>