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
      username:''
    }
  },
  async mounted(){
    await this.getUser()
  },
  methods:{
    selectSearchResults(){
      console.log('okay')
    },
    async getUser() {
      try {
        const data = await getUser(this.user_id);
        this.username = data.username
      } catch (error) {
        console.error('Error fetching user data:', error);
        return;
      }
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
  <div class="header">
    <ul>
      <li :class="{ 'active': activeLink === 'recommendations' }" @click="$router.push({name:'Homepage'})">Рекомендация</li>
      <li :class="{ 'active': activeLink === 'feed' }" @click="">Моя лента</li>
      <li :class="{ 'active': activeLink === 'library' }" @click="">Моя библиотека</li>
      <li :class="{ 'active': activeLink === 'create' }" @click="$router.push({name:'create'})">Создать</li>
    </ul>

    <el-avatar> {{ this.username }} </el-avatar>
  </div>
  <div class="flex flex-row justify-center items-center align-middle" v-if="activeLink==='recommendations' || activeLink==='feed' || activeLink==='library' ">
    <el-autocomplete
        v-model="search"
        placeholder="Please input"
        @select="selectSearchResults"
        class="w-3/4 mt-5"
    />
    <el-button class="mt-5 ml-3">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" round/>
    </el-button>
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
