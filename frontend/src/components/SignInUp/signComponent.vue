<template>
    <div class="w-full h-full">
      <div class="mt-8 ml-8">
        <el-button round @click="goToBack">
          <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </el-button>
      </div>
      <div class="flex flex-col justify-center items-center gap-5 w-full h-full">
        <img src="../../assets/creatingIMG.png" style="width: 25%">
        <h1 class="text-2xl font-bold text-slate-500">{{title}}</h1>
        <el-form class="flex flex-col justify-center items-center gap-3">
          <el-input
              placeholder="Как вас звать?"
              v-model="user.username"
          />
          <el-input
              v-if="isSignUp"
              placeholder="Напишите почту"
              v-model="user.email"
          />
          <el-input
              v-model="user.password"
              type="password"
              placeholder="Please input password"
              show-password
          />
          <el-button
              @click="regUser"
          >
            {{btnTitle}}
          </el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name:'signComponent',
  data(){
    return{
      title:'',
      btnTitle:'',
      isSignUp:true,

      user:{
        password:'',
        email:'',
        username:'',
        user_info_id:null,
      }
    }
  },
  mounted(){
    let isSign = this.$route.query.isSignUp;
    this.isSignUp=(isSign.toLowerCase() === "true");
    if(this.isSignUp){
      this.title='Давайте создадим вашу комнату'
      this.btnTitle="Создать комнату"
    }else{
      this.title="Находим ключ вашей комнаты"
      this.btnTitle = "Войти в свою комнату"
    }
  },
  methods:{
    async regUser() {
      const localServer= 'http://localhost:3001/';

      if (this.isSignUp) {
        if(this.user.username.length===0 || this.user.email.length===0 || this.user.password.length === 0){
          this.$message.error('Заполните данные')
        }else{
          try {
            const response = await axios.post('https://ems-app.kz/ledokol-api/signup', this.user);

            const newUserId = response.data.user_id;
            this.$store.commit('setUserId', newUserId);
            console.log(this.user_id)
            this.$message.success('Успешно')
            this.$router.push({ name: 'Homepage', params: { id: newUserId } });

          } catch (error) {
            console.error('Error registering user:', error);
          }
        }

      } else {
        try {
          const response = await axios.get('https://ems-app.kz/ledokol-api/login', {
            params: {
              username: this.user.username,
              password: this.user.password,
            },
          });

          const newUserId = response.data.user_id

          this.$store.commit('setUserId', newUserId);

          this.$message.success('Success!')

          this.$router.push({name:"homepage", params:{id:this.user_id}});
        } catch (error) {
          this.$message.error('Неверное имя пользователя или пароль.')
        }
      }
    },
    goToBack(){
      this.$router.back();
    }
  },
  computed:{
    user_id() {
      return this.$store.state.userid;
    }
  },
}
</script>

<style scoped lang="scss">
</style>