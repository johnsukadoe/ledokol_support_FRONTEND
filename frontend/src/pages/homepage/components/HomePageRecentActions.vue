<script lang="ts">
import { getCreators } from "@/api/creatorAPI.ts";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePageRecentActions",
  props: {
    lang: String,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async getUsers() {
      const data = await getCreators();
      console.log(data);
      this.users = data;
    },
    userFormattedUsername(username) {
      return username.length > 15 ? username.slice(0, 15) + "..." : username;
    },
    goToProfile(user_id) {
      this.$router.push({ name: "profile", params: { userId: user_id } });
    },
  },
  async mounted() {
    await this.getUsers();
    const data = await axios.get("https://sublimeads.com/api/random");
    console.log(data);
  },
});
</script>

<template>
  <div>
    <h3 class="font-bold">
      {{ lang === "en" ? "Recent Actions" : "Недавние активности" }}
    </h3>
    <div
      v-for="user in users"
      class="p-3 user rounded-xl flex justify-between align-middle items-center"
      style="cursor: pointer"
    >
      <div @click="goToProfile(user.user_id)">
        <el-avatar>{{ user.username }}</el-avatar>
        <span class="ml-5 grow">{{
          userFormattedUsername(user.username)
        }}</span>
        <span class="bg-red-500 text-white px-1 py-0.5 rounded ml-2">{{
          user.user_id
        }}</span>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
.user:hover {
  background-color: rgba(227, 227, 227, 0.5);
}
</style>
