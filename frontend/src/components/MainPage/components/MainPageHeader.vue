<template>
  <header class="main-page-header">
    <div class="logo">
      <a href="#"><h1>Ledokol</h1></a>
    </div>
    <nav>
      <ul>
        <li><a href="#">Войти</a></li>
        <li><a href="#">Зарегистрироваться</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainPageHeader'
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

    a {
      text-decoration: none;
      margin: 0 15px;
      color: inherit;
      font-weight: bold;
      font-size: 16px;
      transition: color 0.3s ease;
    }

    a:hover {
      color: #ffcc00;
    }
  }
}
</style>

