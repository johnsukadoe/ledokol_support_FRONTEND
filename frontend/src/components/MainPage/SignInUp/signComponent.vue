<template>
    <div class="flex flex-col justify-center items-center gap-5 w-full h-full">
      <img src="@/assets/creatingIMG.png">
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
        role: null,
        content_type: null,
        creation_frequency: null,
        monthly_earnings: null,
        join_date: null,
        membership_level: null,
        monthly_contribution: null
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
      if (this.isSignUp) {
        try {
          const response = await axios.post('http://localhost:3001/users', this.user);
          console.log('User registered:', response.data);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      } else {
        try {
          const response = await axios.get('http://localhost:3001/users', {
            params: {
              username: this.user.username,
              password: this.user.password,
            },
          });

          if (response.data.length > 0) {
            console.log('User signed in:', response.data);
            this.$message.success('Success!')
            // this.$router.push()
          } else {
            console.log('User not found');
            this.$message.error('User not found')
          }
        } catch (error) {
          console.error('Error signing in:', error);
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
</style>