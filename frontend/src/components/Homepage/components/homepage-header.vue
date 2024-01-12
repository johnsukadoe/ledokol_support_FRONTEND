<script>
export default {
  name: "homepage-header",
  props: {
    activeLink:String,
  },
  data(){
    return{
      search:''
    }
  },
  methods:{
    selectSearchResults(){
      console.log('okay')
    }
  }
}
</script>

<template>
  <div class="header">
    <ul>
      <li :class="{ 'active': activeLink === 'recommendations' }">Рекомендация</li>
      <li :class="{ 'active': activeLink === 'feed' }">Моя лента</li>
      <li :class="{ 'active': activeLink === 'library' }">Моя библиотека</li>
      <li :class="{ 'active': activeLink === 'create' }">Создать</li>
    </ul>

    <el-avatar> user </el-avatar>
  </div>
  <div class="flex flex-row justify-center items-center align-middle">
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
  background-color: #333;
  padding: 15px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

li:hover {
  color: #ffd700;
}

.active {
  color: #ffe869;
  cursor: default;
}
.active:hover{
  color: #ffe869;
}
</style>