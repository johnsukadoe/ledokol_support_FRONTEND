<script>
import {getUser} from '@/api/homepageUser';
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import HomepageRecentActions from "@/components/Homepage/components/homepage-recent-actions.vue";
export default {
  name: "homepage.vue",
  components: {HomepageRecentActions, HomepageHeader},
  props: ['id'],
  async mounted() {
    const data = await getUser(this.id)
    console.log(data)
  }
}
</script>

<template>
  <homepage-header :activeLink="'recommendations'" style="position: fixed"></homepage-header>
  <div class="flex flex-row justify-around">
    <div>
      soemthing
    </div>
    <homepage-recent-actions></homepage-recent-actions>
  </div>

</template>

<style scoped lang="scss">

</style>