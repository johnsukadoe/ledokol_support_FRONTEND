<script>
import { getUser } from '@/api/homepageUser'

export default {
  name: "homepage-header",
  data(){
    return{
      search:'',
      username:'',

      isAdmin:false,

      lang:'',

      langs: [
        {
          key:'ru',
          value:"Русский"
        },
        {
          key:'en',
          value:"English"
        }
      ],
	    activeLink:''
		}
  },
  async mounted(){
		this.activeLink = this.$route.name
    let value = localStorage.getItem('lang')
    if(value){
      this.lang = value;
    }
    if(!this.user_id()){
      this.$router.push({name:'MainPage'})
    }

    await this.getUser()
  },
  methods:{
    async getUser() {
      try {
        console.log(this.user_id())
        const data = await getUser(this.user_id());
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
      localStorage.removeItem('user_id');
      this.$router.push({ name: 'MainPage'});
    },
    user_id(){
      let value = localStorage.getItem('user_id');
      return value
    },
    postLocaleItem(){
      localStorage.setItem('lang', this.lang);
    },
    emitLang(){
      this.$emit('editLang', this.lang)
    },
	  goTo(routeName){
			this.$router.push({name:routeName, lang:this.lang, params:{userId:this.user_id()}})
		  this.activeLink=routeName;
	  }
  },
  watch:{
    lang(){
      this.postLocaleItem()
    }
  }
}
</script>

<template>
  <div>
    <div class="header">
      <ul>
        <li :class="{ 'active': activeLink === 'recommendations' }" @click="goTo('recommendations')">
          {{ lang === 'en' ? 'Recommendations' : 'Рекомендация' }}
        </li>
        <li :class="{ 'active': activeLink === 'myfeed' }" @click="goTo('myfeed')">
          {{ lang === 'en' ? 'My Feed' : 'Моя лента' }}
        </li>
        <li :class="{ 'active': activeLink === 'subscriptions' }" @click="goTo('subscriptions')">
          {{ lang === 'en' ? 'Subscriptions' : 'Подписки' }}
        </li>
        <li :class="{ 'active': activeLink === 'create' }" @click="goTo('create')">
          {{ lang === 'en' ? 'Create' : 'Создать' }}
        </li>

      </ul>

      <div>
        <el-select
            v-model="lang"
            class="m-2"
            placeholder="Select"
            size="small"
            style="width: 50px"
            @change="emitLang"
        >
          <el-option
              v-for="item in langs"
              :key="item.key"
              :label="item.key"
              :value="item.key"
          />
        </el-select>
        <el-dropdown size="large" trigger="click">

          <el-avatar> {{ this.username }} </el-avatar>

          <template #dropdown>
            <el-dropdown-menu class="flex flex-col">
              <el-dropdown-item @click="goTo('profile')">
                {{ lang === 'en' ? 'Profile' : 'Профиль' }}
              </el-dropdown-item>
              <el-dropdown-item @click="goTo('settings')">
                {{ lang === 'en' ? 'Settings' : 'Настройки' }}
              </el-dropdown-item>
              <el-dropdown-item @click="logout">
                {{ lang === 'en' ? 'Logout' : 'Выйти' }}
              </el-dropdown-item>
              <el-dropdown-item v-if="isAdmin" @click="goTo('admin')">
                {{ lang === 'en' ? 'Admin' : 'Админ' }}
              </el-dropdown-item>
            </el-dropdown-menu>

          </template>
        </el-dropdown>
      </div>

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
	  
	  <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
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
