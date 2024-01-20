<script>
import {getPosts} from "@/api/homepagePosts";
import {getUsers} from "@/api/homepageUser";
export default {
  name: "homepagePosts",
  data(){
    return{
      posts:[],
      users:[],
    }
  },
  async mounted(){
    this.posts = await getPosts()
    this.users = this.getUsers()
    console.log(this.posts)
  },
  methods:{
    async getUsers(){
      try {
        this.users = await getUsers();
        console.log(this.users)

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    secondsToTime(seconds) {
      const date = new Date(seconds * 1000); // Convert seconds to milliseconds
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
      const user = this.users.find(user => user.user_id === id);
      console.log(user)
      return user.username
    },
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 my-6" style="width: 700px">
    <div v-for="post in posts">
      <p class="text-gray-400 text-sm my-1 p-0">{{ secondsToTime(post.timestamp) }}</p>
      <div class="flex">
        <div>
          <el-avatar size="small" class="mr-1.5 my-0.5"> {{ findUserById(post.user_id) }} </el-avatar>
          <span>{{ findUserById(post.user_id) }}</span>
          <h2 class="font-bold my-1">{{post.title}}</h2>
          <p class="text-sm my-2">
            {{truncateDescription(post.description)}}
          </p>
        </div>
      </div>
      <div v-if="post.preview">
        <div v-if="post.preview[1]==='video'">
          <iframe style="border-radius: 10px" class="m-0 p-0" width="700" height="300" :src="post.preview[0]" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div v-else-if="post.preview[1]==='image'">
          <img :src="post.preview[0]" alt="" style="max-width:700px; max-height: 300px; width: auto; height: auto; border-radius: 10px">
        </div>
        <div v-else v-html="post.preview[0]">
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">

</style>