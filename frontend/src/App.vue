<template>
  <main-page-component>

  </main-page-component>
</template>

<script>
import MainPageComponent from './components/MainPage/MainPageComponent.vue';

export default {
  components: { MainPageComponent },
  data() {
    return {
      users:[],
    };
  },
  mounted() {
    fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(data => (this.users = data))
        .catch(error => console.error('Error fetching creators:', error));
  },

};
</script>

<style>
@import "../public/style.css"; 
body {
  font-family: var(--main-font);
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
}
</style>
