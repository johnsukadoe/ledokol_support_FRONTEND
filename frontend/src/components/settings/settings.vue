<script>
import { getCreator, updateCreator } from '@/api/creators.js'
import { getUser } from '@/api/homepageUser.js'
import axios from 'axios'

export default {
  name: "settings",
  components: {},
  data(){
    return{
      user:{
        username:'',
        channel_description:'',
        user_id:null,
      },

      lang:'',
    }
  },
  async mounted(){
    console.log(this.user_id)
    const data = await getCreator(this.user_id);
    const user = await getUser(this.user_id)

    this.user.username = data.username
    this.user.channel_description = data.channel_description;
    this.user.user_id = this.user_id


    this.lang = localStorage.getItem('lang')
    this.showMessageAfterTenSeconds()
  },
  computed:{
    user_id(){
      return this.$route.params.userId;
    }
  },
  methods:{
    async save(){
      const data = await updateCreator(this.user)
      if(data.status === 200){
        this.$message.success('Успешно')
        this.$router.push({name:'profile', params:{userId:this.user_id}})
      }else{
        this.$message.error("Ошибка")
      }
    },
    editLang(lang){
      console.log(lang)
      this.lang = lang;
    },
    async showMessageAfterTenSeconds() {
      setTimeout(async () => {
        console.log("Прошло 10 секунд!");
        const {data} = await axios.get('https://api.api-ninjas.com/v1/facts', {
          headers: {
            'X-Api-Key': '1mAakESykRxpQRG/SXJW0Q==Hu2qwg2bn88cyiom'
          },
          params: {
            limit: 1
          }
        })
        this.$message.info(`Random fact: ${data[0].fact}`)
      }, 10000);
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <div class="mt-4">
      <h1>
        {{ lang === 'en' ? 'Settings' : 'Настройки' }}
      </h1>
      <div class="flex flex-col gap-5">
        <div class="mt-5">
          <h2>
            {{ lang === 'en' ? 'Channel name' : 'Название канала' }}
          </h2>
          <el-input v-model="user.username"></el-input>
        </div>
        <div>
          <h2>
            {{ lang === 'en' ? 'Channel description' : 'Описание канала' }}
          </h2>
          <el-input v-model="user.channel_description" type="textarea"></el-input>
        </div>
      </div>
      <div class="mt-6">
        <el-button plain round type="danger" @click="$router.push({name:'profile', params:{userId:user_id}})">
          {{ lang === 'en' ? 'Cancel' : 'Отмена' }}
        </el-button>
        <el-button plain round type="primary" @click="save">
          {{ lang === 'en' ? 'Save' : 'Сохранить' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1{
  font-size: 32px;
  font-weight: 600;
}
h2{
  font-size: 17px;
  font-weight: 500;
}
</style>