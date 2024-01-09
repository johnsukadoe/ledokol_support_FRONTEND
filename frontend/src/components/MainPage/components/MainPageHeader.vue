<template>
  <header class="main-page-header">
    <div class="logo">
      <a href="#"><h1>Ledokol</h1></a>
    </div>
    <nav>
      <ul>
        <li><button @click="showSignInModal=true;">Войти</button></li>
        <li><button @click="showSignUpModal=true;">Зарегистрироваться</button></li>
      </ul>
    </nav>

    <signModalComponentVue v-if="showSignUpModal"></signModalComponentVue>
  </header>
</template>

<script>
import signModalComponentVue from '@/components/MainPage/components/signModalComponent.vue'
export default {
  name: 'MainPageHeader',
  components:{signModalComponentVue},
  data(){
    return{
      showSignInModal:false,
      showSignUpModal:false,
    }
  },
}
</script>

<style scoped lang="scss">
.logo {
  a {
    color: white;
    text-decoration: none;

    h1 {
      text-shadow: 0 0 16px rgba(255, 255, 255, 0.8); 
      font-family: var(--logo-font);
      font-size: 28px;
    }
  }
}

.main-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #fff;

  .logo {
    img {
      max-width: 100%;
      height: auto;
    }
  }

  nav {
    ul {
      list-style: none;
      display: flex;
      justify-content: flex-end;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: inherit;
      font-weight: bold;
      font-size: 16px;
      transition: color 0.3s ease;
      margin: 0 15px;
      padding: 0;
    }

    button:hover {
      color: #ffcc00;
    }
  }
}
</style>
