<script>
import {getPosts, removePost} from "@/api/homepagePosts.js";
import {getUsers, getUser} from "@/api/homepageUser.js";

export default {
  name: "main-posts",
  props:{
    filters:Object,
    lang:String
  },
  data(){
    return{
      posts:[],
      users:[],

      isMyProfilePosts:false,

      title:'',
    }
  },
  async mounted() {
    this.users = await getUsers();
    await this.getPosts()
    if(this.filters && this.filters.isMyProfile){
      this.isMyProfilePosts = true;
    }
  },
  methods:{
    async getPosts(){
      let filters = {};
      if(this.filters && !this.filters.isProfile){
        let user = await getUser(this.filters.user_id)
        console.log(user)
        if(!user.subscriptions.length){
          this.title='Нет данных'
          return;
        }
        filters.creators = [...user.subscriptions];
      }
      else if(this.filters && this.filters.isProfile){
        filters= {...this.filters}
      }
      this.posts = await getPosts(filters)

    },
    secondsToTime(seconds) {
      const date = new Date(seconds * 1000);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return date.toLocaleDateString('ru-RU', options);
    },
    truncateDescription(text, max_length = 120) {
      if (text.length <= max_length) {
        return text;
      } else {
        const truncatedText = text.slice(0, max_length).trim();
        return `${truncatedText}...`;
      }
    },
    findUserById(id) {
      console.log(this.users)
      const user = this.users.find(user => user.user_id === id);
      console.log(user.username)
      return user.username
    },
    async edit(post_id){
      this.$router.push({name:'post-edit', params:{postId:post_id}})
    },
    async remove(post_id){
      this.$confirm(
          'Вы собираетесь удалить пост. Вы уверены?',
          'Warning',
          {
            confirmButtonText: 'Да',
            cancelButtonText: 'Отмена',
            type: 'warning',
          }
      ).then(async () => {
        const data = await removePost(post_id)
        if(data.status === 200){
          this.$message.success('Успешно')
          await this.getPosts()
        }else{
          this.$message.error('Ошибка')
        }
      })
    }
  },
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-6 my-6">
      <div v-if="posts.length" v-for="post in posts" class="flex justify-between">
        <div>
          <p class="text-gray-400 text-sm my-1 p-0">{{ secondsToTime(post.timestamp) }}</p>
          <div class="flex">
            <div>
              <el-avatar size="small" class="mr-1.5 my-0.5"> {{ findUserById(post.user_id) }} </el-avatar>
              <span class="username-link text-gray-600 text-sm" @click="$router.push({name:'profile', params:{userId:post.user_id}})">{{ findUserById(post.user_id) }}</span>
              <h2 class="font-bold my-1 title-link" >
                {{ lang === 'en' ? post.titleEN : post.titleRU }}
              </h2>
              <p class="text-sm my-2" style="width: 700px">
                {{ lang === 'en' ? truncateDescription(post.descriptionEN) : truncateDescription(post.descriptionRU) }}
              </p>
            </div>
          </div>
          <div v-if="post.preview">
            <div v-if="post.preview.type==='video'">
              <iframe style="border-radius: 10px" class="m-0 p-0" width="700" height="300" :src="post.preview.source" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; gyroscope; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div v-else-if="post.preview.type==='image'">
              <img :src="post.preview.source" alt="" style="max-width:700px; max-height: 300px; width: auto; height: auto; border-radius: 5px">
            </div>
            <div v-else v-html="post.preview.source">
            </div>
          </div>
        </div>
        <div v-if="isMyProfilePosts" class="pt-2">
          <el-button type="primary" plain round size="small" @click="edit(post._id)">Редактировать</el-button>
          <el-button type="danger" plain round size="small" @click="remove(post._id)">Удалить</el-button>
        </div>
      </div>
      <div v-else>
        {{title}}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-link:hover{
  cursor: pointer;
  text-decoration: underline;
}
.username-link:hover{
  cursor: pointer;
  text-decoration: underline;
}
</style>