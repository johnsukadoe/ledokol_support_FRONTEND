<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AuthWindow",
  props: {
    showAuth: {
      default: Boolean,
    },
    type: {
      default: String,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleHide() {
      this.$router.push({ name: "PublicPage" });
    },
  },
});
</script>

<template>
  <Dialog
    :visible="showAuth"
    modal
    :header="type === 'signin' ? 'Войти' : 'Регистрация'"
    :dismissableMask="true"
    :draggable="false"
    class="w-1/2"
    @update:visible="$emit('hideAuth')"
  >
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-5/12 flex flex-col items-center justify-center gap-3"
      >
        <div class="flex flex-col w-full">
          <label for="username">Имя пользователя</label>
          <InputText
            id="username"
            type="text"
            size="small"
            :username="username"
            class="w-full"
            placeholder="Бека"
          />
        </div>
        <div class="flex flex-col w-full" v-if="type === 'signup'">
          <label for="email">Почта</label>
          <InputText
            id="email"
            type="email"
            size="small"
            class="w-full"
            placeholder="beka667@gmail.com"
          />
        </div>
        <div class="card flex flex-col w-full">
          <label for="password">Пароль</label>
          <InputText id="password" type="password" size="small" />
        </div>
        <div class="flex gap-x-4 justify-center items-center mt-4">
          <Button
            :label="type === 'signin' ? 'Войти' : 'Регистрация'"
            :severity="type === 'signin' ? 'success' : 'info'"
            icon="pi pi-user"
            size="small"
          ></Button>
          <Button
            v-if="type === 'signin'"
            label="Забыли пароль?"
            severity="success"
            text
            size="small"
          />
        </div>
      </div>
      <div class="w-full md:w-2/12">
        <Divider layout="vertical" class="hidden md:flex"><b>ИЛИ</b></Divider>
        <!--        <Divider layout="horizontal" class="flex md:hidden" align="center"-->
        <!--          ><b>OR</b></Divider-->
        <!--        >-->
      </div>
      <div class="w-full md:w-5/12 flex items-center justify-center py-5">
        <Button
          :label="type === 'signin' ? 'Регистрация' : 'Войти'"
          icon="pi pi-user-plus"
          :severity="type === 'signin' ? 'info' : 'success'"
          size="small"
          class="w-full max-w-[17.35rem] mx-auto"
          @click="$emit('changeType', type === 'signin' ? 'signup' : 'signin')"
        ></Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.input .p-password-input {
  width: 100%;
  background-color: red;
}
</style>
