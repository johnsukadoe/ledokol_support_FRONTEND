<script>
import {getUser} from '@/api/homepageUser';
export default {
  name: "homepage-header",
  props: {
    activeLink:String,
  },
  data(){
    return{
      search:'',
      username:'',

      isAdmin:false,
    }
  },
  async mounted(){
    await this.getUser()
  },
  methods:{
    async getUser() {
      try {
        const data = await getUser(this.user_id);
        this.username = data.username
        if(data.role === 'admin'){
          this.isAdmin = true;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        return;
      }
    },
    logout(){
      this.$store.commit('setUserId', 0);
      this.$router.push({ name: 'MainPage'});
    }
  },
  computed:{
    user_id() {
      return this.$store.state.userid;
    }
  },
}
</script>

<template>
  <div>
    <div class="header">
      <ul>
        <li :class="{ 'active': activeLink === 'recommendations' }" @click="$router.push({name:'homepage'})">Рекомендация</li>
        <li :class="{ 'active': activeLink === 'news' }" @click="$router.push({name:'news'})">Новости</li>
        <li :class="{ 'active': activeLink === 'myfeed' }" @click="$router.push({name:'myfeed'})">Моя лента</li>
        <li :class="{ 'active': activeLink === 'subscriptions' }" @click="$router.push({name:'subscriptions'})">Подписки</li>
        <li :class="{ 'active': activeLink === 'create' }" @click="$router.push({name:'create'})">Создать</li>
      </ul>


      <el-dropdown trigger="click" size="large">
        <el-avatar> {{ this.username }} </el-avatar>

        <template #dropdown>
          <el-dropdown-menu class="flex flex-col">
            <el-dropdown-item @click="$router.push({name:'profile', params:{userId:user_id}})">Профиль</el-dropdown-item>
<!--            <el-dropdown-item>Статистика</el-dropdown-item>-->
            <el-dropdown-item @click="$router.push({name:'settings', params:{userId:user_id}})">Настройки</el-dropdown-item>
            <el-dropdown-item @click="logout">Выйти</el-dropdown-item>
            <el-dropdown-item @click="$router.push({name:'admin'})" v-if="isAdmin">Админ</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
<!--    <div class="flex flex-row justify-center items-center align-middle" v-if="activeLink==='recommendations' || activeLink==='myfeed' || activeLink==='subscriptions' ">-->
<!--      <el-autocomplete-->
<!--          v-model="search"-->
<!--          placeholder="Please input"-->
<!--          @select="selectSearchResults"-->
<!--          class="w-3/4 mt-5"-->
<!--      />-->
<!--      <el-button class="mt-5 ml-3">-->
<!--        <font-awesome-icon icon="fa-solid fa-magnifying-glass" round/>-->
<!--      </el-button>-->
<!--    </div>-->
  </div>



</template>

<style scoped lang="scss">
.header {
  background-color: white;  /* Белый фон */
  padding: 15px;
  color: #333;  /* Цвет текста (черный или другой, который вы хотите) */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;  /* Добавляем подчеркивание для отличия от основного контента */
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 20px;
  cursor: pointer;
  color: #333;  /* Цвет обычных ссылок */
}

li:hover {
  color: #ffd700;  /* Цвет при наведении на ссылку */
}

.active {
  color: #ffe869;  /* Цвет активной ссылки */
  cursor: default;
}

.active:hover {
  color: #ffe869;  /* Цвет активной ссылки при наведении */
}

/* Стили для поиска и кнопки */
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 75%;  /* Ширина поисковой строки */
  margin-top: 15px;
}

.search-button {
  margin-top: 15px;
  margin-left: 10px;
}
</style>
