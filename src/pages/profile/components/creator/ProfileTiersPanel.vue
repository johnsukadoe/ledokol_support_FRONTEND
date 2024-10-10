<script lang="ts">
import ProfileAddTier from "@/pages/profile/components/creator/ProfileAddTier.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileTiersPanel",
  components: { ProfileAddTier },
  data() {
    return {
      tiers: [],
    };
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
  </Panel>

  <ProfileAddTier ref="addTier"></ProfileAddTier>
</template>

<style scoped lang="scss"></style>
