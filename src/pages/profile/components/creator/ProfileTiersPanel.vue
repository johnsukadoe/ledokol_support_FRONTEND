<script lang="ts">
import { getTiers } from "@/api/apiTiers.ts";
import ProfileAddTier from "@/pages/profile/components/creator/ProfileAddTier.vue";
import useUserStore from "@/store/user.ts";
import type { ITier } from "@/types/ITier.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileTiersPanel",
  components: { ProfileAddTier },
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;

    return {
      user,
    };
  },
  data() {
    return {
      tiers: [] as ITier[],

      profileId: 0,
    };
  },
  async mounted() {
    const data = await getTiers(this.user.creator.id);
    this.tiers = data;
  },
  methods: {
    open() {
      this.$refs.addTier.open();
    },
  },
});
</script>

<template>
  <Panel header="Тиры">
    {{ tiers }}
    <div v-if="!tiers.length" class="w-full flex justify-center">
      <Button
        icon="pi pi-plus"
        label="Добавить тир"
        severity="secondary"
        size="small"
        @click="open"
      />
      <!--	    @click='this.$refs.open'-->
    </div>
    <div v-else v-for="tier in tiers" class="red">
      <div>{{ tier.name }} {{ tier.price }}</div>
    </div>
    <Button
      icon="pi pi-plus"
      label="Добавить тир"
      severity="secondary"
      size="small"
      @click="open"
    />
  </Panel>

  <ProfileAddTier ref="addTier"></ProfileAddTier>
</template>

<style scoped lang="scss">
.red {
  color: red;
}
</style>
