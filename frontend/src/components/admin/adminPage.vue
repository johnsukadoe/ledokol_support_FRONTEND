<script>
import { getPosts, removePost } from '@/api/homepagePosts.js'
import { getUsers } from '@/api/homepageUser.js'
import MainPosts from '@/components/main-posts.vue'

export default {
  name: "adminPage",
  components: {MainPosts, },
  data(){
    return{
      posts:[],
      users:[],

      lang:'',

    }
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
          const data = await getPosts();
          this.posts = [...data];

        }else{
          this.$message.error('Ошибка')
        }
      })
    },
    editLang(lang){
      console.log(lang)
      this.lang = lang;
    }
  },
  async mounted(){
    const data = await getPosts();
    this.posts = [...data];

    const user = await getUsers();
    this.users = [...user];

    this.lang = localStorage.getItem('lang')
  },

}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">

    <div class="flex flex-col gap-6 my-6">
      <div v-for="post in posts" class="flex justify-between">
        <div>
          <p class="text-gray-400 text-sm my-1 p-0">{{ secondsToTime(post.timestamp) }}</p>
          <div class="flex">
            <div>
              <el-avatar class="mr-1.5 my-0.5" size="small"> {{ findUserById(post.user_id) }} </el-avatar>
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
              <iframe :src="post.preview.source" allow="accelerometer; autoplay; clipboard-write; gyroscope; encrypted-media; picture-in-picture; web-share" allowfullscreen class="m-0 p-0" frameborder="0" height="300" style="border-radius: 10px" title="YouTube video player" width="700"></iframe>
            </div>
            <div v-else-if="post.preview.type==='image'">
              <img :src="post.preview.source" alt="" style="max-width:700px; max-height: 300px; width: auto; height: auto; border-radius: 5px">
            </div>
            <div v-else v-html="post.preview.source">
            </div>
          </div>
        </div>
        <div class="pt-2">
          <el-button plain round size="small" type="primary" @click="edit(post._id)">
            {{ lang === 'en' ? 'Edit' : 'Редактировать' }}
          </el-button>
          <el-button plain round size="small" type="danger" @click="remove(post._id)">
            {{ lang === 'en' ? 'Delete' : 'Удалить' }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>