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
        if(this.user.username.length===0 || this.user.email.length===0 || this.user.password.length === 0){
          this.$message.error('Заполните данные')
        }else{
          try {
            this.user.role='subscriber';
            const response = await axios.post('http://localhost:3001/users', this.user);

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
          const response = await axios.get('http://localhost:3001/users', {
            params: {
              username: this.user.username,
              password: this.user.password,
            },
          });
          this.$message.success('Success!')

          const newUserId = response.data[0].user_id
          console.log(newUserId)

          this.$store.commit('setUserId', newUserId);

          this.$router.push({name:"Homepage", params:{id:this.user_id}});
          // this.$router.push()
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