<script lang="ts">
import { createTier } from "@/api/apiTiers.ts";
import useUserStore from "@/store/user.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileAddTierPanel",
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;
    return {
      user,
    };
  },
  data() {
    return {
      show: false,

      tier: {
        name: "",
        description: "",
        price: 100,
        benefits: [""],
      },
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },

    addBenefit() {
      if (this.tier.benefits.length < 5) {
        this.tier.benefits.push(""); // Добавляем новое пустое поле
      }
    },
    async addTier() {
      const payload = { ...this.tier, creatorId: this.user.creator.id };
      const data = await createTier(payload);
      if (data) {
        this.close();
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Тир успешно создан",
          life: 3000,
        });
      }
    },
  },
});
</script>

<template>
  <Drawer
    v-model:visible="show"
    header="Добавить тир"
    position="right"
    class="!w-1/3"
  >
    <div class="flex flex-col mt-5 w-full gap-y-6">
      <FloatLabel class="w-full">
        <InputText id="name" v-model="tier.name" class="w-full" size="small" />
        <label for="name">Название тира</label>
      </FloatLabel>

      <div class="flex flex-col">
        <FloatLabel>
          <Textarea
            v-model="tier.description"
            cols="30"
            class="w-full"
            auto-resize
            :invalid="tier.description.length > 300"
          />
          <label>Описание тира</label>
        </FloatLabel>
        <Tag
          :value="`${tier.description.length}/300`"
          :severity="tier.description.length > 300 ? 'danger' : null"
          class="self-end"
        ></Tag>
      </div>

      <div>
        <FloatLabel>
          <InputNumber
            v-model="tier.price"
            inputId="price"
            mode="currency"
            currency="KZT"
            fluid
          />
          <label for="price">Стоимость</label>
        </FloatLabel>
      </div>

      <div class="w-full">
        <Panel header="Преимущества">
          <div class="flex flex-col gap-3">
            <!-- Перебираем преимущества -->
            <div v-for="(benefit, index) in tier.benefits" :key="index">
              <InputText
                v-model="tier.benefits[index]"
                class="w-full"
                size="small"
              />
            </div>

            <!-- Кнопка добавления -->
            <Button
              icon="pi pi-plus"
              label="Добавить преимущество"
              :disabled="tier.benefits.length >= 5"
              @click="addBenefit"
              severity="secondary"
              size="small"
              class="w-full"
            />
          </div>
        </Panel>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-2">
        <Button
          label="Отмена"
          icon="pi pi-times"
          class="flex-auto"
          size="small"
          outlined
          @click="close"
        ></Button>
        <Button
          label="Создать"
          size="small"
          icon="pi pi-check"
          class="flex-auto"
          severity="info"
          outlined
          @click="addTier"
        ></Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped lang="scss"></style>
