<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import {getUsers, removeUser} from "@/api/homepageUser.js";

export default {
  name: "adminPage",
  components: {HomepageHeader},
  data(){
    return{
      users:[]
    }
  },
  methods:{
     formatTimestamp(timestamp) {
      const date = new Date(timestamp);
       console.log(date)
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      const formattedDate = `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;

      return formattedDate;
    },
    async removeUser(user_id){
      this.$confirm(
          'Вы собираетесь удалить аккаунт. Вы уверены?',
          'Warning',
          {
            confirmButtonText: 'Да',
            cancelButtonText: 'Отмена',
            type: 'warning',
          }
      ).then(async () => {
        const data = await removeUser(user_id)
        if (data.status === 200) {
          this.$message.success('Успешно')

          const data = await getUsers();
          this.users = [...data];
        }
      })
    },
    handleEdit(index, row){
      this.$router.push({name:'settings', params:{userId:row.user_id}})
    }
  },
  async mounted(){
    const data = await getUsers();
    this.users = [...data];
    console.log(this.users)
  },

}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">

    <homepage-header></homepage-header>

    <div class="m-9">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="user_id" label="ID"/>
        <el-table-column prop="join_date" label="Creating Date">
          <template #default="scope">{{ formatTimestamp(scope.row.join_date) }}</template>
        </el-table-column>
        <el-table-column prop="username" label="Username"/>
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role"></el-table-column>
        <el-table-column prop="password" label="Password" />
        <el-table-column width="60">
          <template #default="scope">
            <el-button type="primary" plain round size="small"  @click="handleEdit(scope.$index, scope.row)">
              <font-awesome-icon icon="fa-solid fa-pencil" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column width="60">
          <template #default="scope">
            <el-button type="danger" plain round size="small" @click="removeUser(scope.row.user_id)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>