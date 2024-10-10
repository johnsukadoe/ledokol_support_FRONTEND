<script lang="ts">
import useUserStore from "@/store/user.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StudioWrapper",
  created() {
    const userStore = useUserStore();
    if (userStore.user.role === "USER") {
      this.$router.push({ name: "recommendations" });
    }
  },
});
</script>

<template>
  <router-view> </router-view>
</template>

<style scoped lang="scss"></style>
