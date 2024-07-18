<template>
  <div>
    <router-view> </router-view>
  </div>
</template>

<script>
import MainPageComponent from "@/components/MainPage/MainPageComponent.vue";

export default {
  components: { MainPageComponent },
  data() {
    return {
      users: [],
    };
  },
  mounted() {},
  methods: {
    user_id() {
      let value = localStorage.getItem("user_id");
      return value;
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: var(--main-font);
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--heading-font);
}
</style>
