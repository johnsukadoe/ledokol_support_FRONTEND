<script lang="ts">
import { login, register } from "@/api/apiAuth.ts";
import useMainStore from "@/store";
import useUserStore from "@/store/user.ts";
import { defineComponent, nextTick } from "vue";

export default defineComponent({
  name: "AuthWindow",
  setup() {
    const store = useMainStore();
    const userStore = useUserStore();

    return {
      userStore,
      store,
    };
  },
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
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    async authUser() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      if (this.type === "signup") {
        const user = await register({ ...payload, username: this.username });
      }
      const user = await login(payload);
      if (user.id) {
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Вы успешно зашли",
          life: 2000,
        });

        this.userStore.updateUser(user);
        this.store.changeLogin(true);
        await nextTick();
        setTimeout(() => {
          this.$router.push({ name: "recommendations" });
        }, 100); // Add a small delay to test if the router push is being skipped due to timing
      }
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
        <div class="flex flex-col w-full" v-if="type === 'signup'">
          <label for="username">Имя пользователя</label>
          <InputText
            id="username"
            type="text"
            size="small"
            class="w-full"
            placeholder="Бека"
            v-model="username"
          />
        </div>
        <div class="flex flex-col w-full">
          <label for="email">Почта</label>
          <InputText
            id="email"
            type="email"
            size="small"
            class="w-full"
            placeholder="beka667@gmail.com"
            v-model="email"
          />
        </div>
        <!--        <div class="flex flex-col w-full" v-if="type === 'signup'">-->
        <!--          <div class="flex-auto">-->
        <!--            <label for="phone">Телефон</label>-->
        <!--            <InputMask-->
        <!--              id="phone"-->
        <!--              v-model="user.phone"-->
        <!--              mask="(999) 999-9999"-->
        <!--              placeholder="(777) 777-7777"-->
        <!--              fluid-->
        <!--              style="height: 33px"-->
        <!--            />-->
        <!--          </div>-->
        <!--        </div>-->

        <div class="card flex flex-col w-full">
          <label for="password">Пароль</label>
          <Password
            v-if="type === 'signup'"
            v-model="password"
            toggleMask
            fluid
            promptLabel="Выберите пароль"
            weakLabel="Слишком простой"
            mediumLabel="Средняя сложность"
            strongLabel="Сложный пароль"
            style="height: 33px"
          />
          <Password
            v-if="type === 'signin'"
            v-model="password"
            toggleMask
            fluid
            style="height: 33px"
            :feedback="false"
          />
        </div>
        <div class="flex gap-x-4 justify-center items-center mt-4">
          <Button
            :label="type === 'signin' ? 'Войти' : 'Регистрация'"
            :severity="type === 'signin' ? 'success' : 'info'"
            icon="pi pi-user"
            size="small"
            @click="authUser"
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

    <Toast />
  </Dialog>
</template>

<style scoped lang="scss">
.p-inputmask {
  height: 33px;
}
</style>
