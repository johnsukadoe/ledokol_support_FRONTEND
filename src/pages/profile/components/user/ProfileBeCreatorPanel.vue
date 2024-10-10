<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileBeCreatorPanel",
});
</script>

<template>
  <Panel class="flex items-center justify-center">
    <div class="flex flex-col items-center my-5 gap-2">
      <p class="text-gray-700 text-xl m-0 p-0">Станьте креатором</p>
      <p class="text-gray-500 text-sm m-0 p-0">
        У вас нет креатор аккаунта, создайте чтобы выкладывать экслюзивные
        контенты для фанатов
      </p>
      <Button
        label="Стать креатором"
        severity="info"
        icon="pi pi-sparkles"
        size="small"
      />
    </div>
    <!--          @click="handleCreator"-->
  </Panel>
</template>

<style scoped lang="scss"></style>
