<template>
    <div class="body" @click="closeModal">
      <div class="body__content">
        <span class="close" @click="closeModal">&times;</span>
          <div class="flex flex-col justify-center items-center gap-5">
            <img src="@/assets/creatingIMG.png" class="w-1/2">
            <h1 class="text-2xl font-bold text-slate-500">{{title}}</h1>
            <el-form class="flex flex-col justify-center items-center gap-3">
              <el-input
                  placeholder="Как вас звать?"
                  v-model="user.username"
              />
              <el-input
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
                Создать комнату
              </el-button>
            </el-form>
          </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name:'signModalComponent',
  props:{
    showModal:String,
  },
  data(){
    return{
      title:'',

      user:{
        password:'',
        email:'',
        username:'',
      }
    }
  },
  mounted(){
    if(this.showModal=== "SignUp"){
      this.title='Давайте создадим вашу комнату'
    }else{
      this.title='Находим ключ к вашей комнате'
    }
  },
  methods:{
    closeModal(event){
      if(event.target.className === "body" || event.target.className === "close"){
        this.$emit('closeModal');
      }
    },
    async regUser() {
      await axios.post('http://localhost:3001/users', this.user)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error('Error registering user:', error);
          });
    },

  }
}
</script>

<style scoped lang="scss">
  .body{
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .body__content{
    background-color: #fefefe;
    border-radius: 13px;
    margin: 5% auto;
    padding: 10px 20px;
    border: 1px solid #888;
    width: 50%;
      img{
        width: 50%;
      }
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>