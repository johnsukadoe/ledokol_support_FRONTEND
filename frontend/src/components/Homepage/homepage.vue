<script>
import {getUser} from '@/api/homepageUser';
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
export default {
  name: "homepage.vue",
  components: {HomepageHeader},
  props: ['id'],
  async mounted() {
    const data = await getUser(this.id)
    console.log(data)
  }
}
</script>

<template>
  <homepage-header :activeLink="'recommendations'"></homepage-header>
  <div>

  </div>

</template>

<style scoped lang="scss">

</style>