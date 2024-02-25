<script>
import {getPosts} from "@/api/homepagePosts";
import {getUsers} from "@/api/homepageUser";
export default {
  name: "homepagePosts",
  data(){
    return{
      posts:[],
      users:[],
      youtube:"https://www.youtube.com/embed/Mhu6mfRkXpk?si=XnanshaDwKkBRUGo"
    }
  },
  async mounted(){
    this.posts = await getPosts()
    this.users = await getUsers();
    console.log(this.posts)
  },
  computed:{

  },
  methods:{
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
      const user = this.users.find(user => user.user_id === id);
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
          <span class="username-link text-gray-600 text-sm">{{ findUserById(post.user_id) }}</span>
          <h2 class="font-bold my-1 title-link" >{{post.title}}</h2>
          <p class="text-sm my-2">
            {{truncateDescription(post.description)}}
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