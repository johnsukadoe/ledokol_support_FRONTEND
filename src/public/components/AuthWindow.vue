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
      user: {
        name: "",
        email: "",
        password: "",
        phone: "",
      },
    };
  },
  methods: {
    async authUser() {
      console.log(this.type);
      if (this.type === "signup") {
        const user = await createUser(this.user);
        // const newUser = await users.create(
        //   ID.unique(),
        //   this.user.email,
        //   this.user.phone,
        //   undefined,
        //   this.user.name,
        // );
        // console.log(newUser);
        console.log(user);
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
        <div class="flex flex-col w-full">
          <label for="username">Имя пользователя</label>
          <InputText
            id="username"
            type="text"
            size="small"
            class="w-full"
            placeholder="Бека"
            v-model="user.name"
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
            v-model="user.email"
          />
        </div>
        <div class="flex flex-col w-full" v-if="type === 'signup'">
          <div class="flex-auto">
            <label for="phone">Телефон</label>
            <InputMask
              id="phone"
              v-model="user.phone"
              mask="(999) 999-9999"
              placeholder="(777) 777-7777"
              fluid
              style="height: 33px"
            />
          </div>
        </div>

        <div class="card flex flex-col w-full">
          <label for="password">Пароль</label>
          <Password
            v-model="user.password"
            toggleMask
            fluid
            promptLabel="Выберите пароль"
            weakLabel="Слишком простой"
            mediumLabel="Средняя сложность"
            strongLabel="Сложный пароль"
            style="height: 33px"
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
  </Dialog>
</template>

<style scoped lang="scss">
.p-inputmask {
  height: 33px;
}
</style>
