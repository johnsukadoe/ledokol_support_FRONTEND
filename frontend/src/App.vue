<template>
  <div>
    <router-view>

    </router-view>
  </div>
</template>

<script>
import MainPageComponent from '@/components/MainPage/MainPageComponent.vue';

export default {
  components: { MainPageComponent },
  data() {
    return {
      users:[],
    };
  },
  mounted() {
    const localServer= 'http://localhost:3001/'

    fetch('https://ems-app.kz/ledokol-api/users')
        .then(response => response.json())
        .then(data => (this.users = data))
        .catch(error => console.error('Error fetching creators:', error));
  },

};
</script>

<style lang="scss">
body {
  font-family: var(--main-font);
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
}
</style>
