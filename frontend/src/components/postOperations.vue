<script>
import {createPost} from "@/api/createPost.js";
import {editPost, getPosts} from "@/api/homepagePosts.js";
import axios from "axios";

export default {
  name: "postOperations",
  props:{
    isEdit:{
      default:false,
    },
    postId:{
      default: 0,
    }
  },
  data(){
    return{
      title:'Создание поста',

      post:{
        user_id:null,
        title:'',
        description:"",
        timestamp:Math.floor(Date.now() / 1000),
        preview:{},
      },
    }
  },
  async mounted() {
    if(this.isEdit){
      this.title = 'Редактирование поста';
      const data = await getPosts({post_id:this.postId})
      let post = data[0];

      this.post.title = post.title;
      this.post.description = post.description;
      this.post._id = post._id

      await this.checkProfanity()
    }
  },
  methods:{
    async createPost(){
      this.post.user_id = this.user_id

      if(this.post.title.length===0 || this.post.description.length === 0){
        this.$message.error('Заполните данные')
      }else{
        const data = await createPost(this.post);
        console.log(data)
        this.$message.success('Успешно');
      }
    },
    async editPost(id){
      this.post.user_id = this.user_id
      this.post._id = id
      console.log(this.post)
      const data = await editPost(this.post);
      if(data.status === 200){
        this.$message.success('Успешно')
        this.$router.push({name:'profile', params:{userId:this.user_id}})
      }else{
        this.$message.error('Ошибка')
      }
    },
  },
  computed:{
    user_id() {
      return this.$store.state.userid;
    }
  }
}
</script>

<template>
  <div class="my-4">
    <h1 class="text-3xl font-medium mx-4">{{ title }}</h1>
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
        <el-button size="large" @click="createPost" v-if="!isEdit">Создать пост</el-button>
        <el-button size="large" @click="editPost(post._id)" v-else>Редактировать пост</el-button>

      </div>
      <div style="width: 300px; " >
        <img src="@/assets/createPost.jpg" alt="" style="border-radius: 7px">
        <h2 class="text-2xl font-medium">Принеси в мир что-то свое</h2>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>