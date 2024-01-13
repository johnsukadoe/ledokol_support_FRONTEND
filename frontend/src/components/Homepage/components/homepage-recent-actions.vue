<script>
import {getUsers} from "@/api/homepageUser";

export default {
  name: "homepage-recent-actions",
  data(){
    return{
      users:[],
    }
  },
  methods:{
    async getUsers(){
      const users = await getUsers();
      this.users=users
      console.log(users)
    },
    userFormattedUsername(username) {
      return username.length > 15
          ? username.slice(0, 15) + '...'
          : username;
    },
  },
  mounted(){
    this.getUsers()
  }
}
</script>

<template>
  <div>
    <h3 class="font-bold">Недавние активности</h3>
    <div v-for="user in users" class="p-3 user rounded-xl flex justify-between align-middle items-center" style="cursor:pointer;">
      <el-avatar>{{user.username}}</el-avatar>
      <span class="ml-5 grow">{{userFormattedUsername(user.username)}}</span>
      <span class="bg-red-500 text-white px-1 py-0.5 rounded ml-2">{{user.user_id}}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user:hover{
  background-color: rgba(227, 227, 227, 0.5);

}
</style>