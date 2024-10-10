<script lang="ts">
import useUserStore from "@/store/user.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileSubsPanel",
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;

    return {
      user,
    };
  },
});
</script>

<template>
  <Panel header="Подписки">{{ user }} </Panel>
</template>

<style scoped lang="scss"></style>
