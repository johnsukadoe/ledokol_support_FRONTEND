<template>
  <header class="main-page-header">
    <div class="logo">
      <a href="#"><img src="@/assets/logo.png"></a>
    </div>
    <nav>
      <ul>
        <li><button @click="$router.push({ name: 'RegisterPage', query:{isSignUp:false} });">Войти</button></li>
        <li><button @click="$router.push({ name: 'RegisterPage', query:{isSignUp:true} });">Зарегистрироваться</button></li>
      </ul>
    </nav>

  </header>
</template>

<script>
import signComponent from '@/components/SignInUp/signComponent.vue'
export default {
  name: 'MainPageHeader',
  components:{signComponent},
  data(){
    return{
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
    img{
      width: 160px;
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
      max-width: 50%;
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
