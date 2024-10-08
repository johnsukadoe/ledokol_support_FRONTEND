<script lang="ts">
import { logout } from "@/api/apiAuth.ts";
import { createCreator } from "@/api/apiCreator.ts";
import useUserStore from "@/store/user.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePageNav",
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      creatorBtn: false,

      terms:
        '<p class="terms text-sm mt-1">\n' +
        "      Нажимая <strong>'Стать автором'</strong>, вы соглашаетесь с \n" +
        '      <a href="#" target="_blank" class="text-sky-700">условиями использования</a> и \n' +
        '      <a href="#" target="_blank" class="text-sky-700">политикой конфиденциальности</a>.\n' +
        "    </p>",

      links: [
        {
          title: "Главная",
          routeName: "recommendations",
          icon: "pi pi-home",
        },
        {
          title: "Подписки",
          routeName: "subscriptions",
          icon: "pi pi-users",
        },
      ],
      menuLinks: [
        {
          label: "Профиль",
          routeName: "profile",
          icon: "pi pi-user",
        },
        {
          label: "Настройки",
          routeName: "settings",
          icon: "pi pi-cog",
        },
        {
          label: "Выйти",
          routeName: "logout",
          icon: "pi pi-sign-out",
        },
        {
          label: "Админ",
          routeName: "admin",
          icon: "pi pi-crown",
        },
      ],
    };
  },
  methods: {
    async createCreator() {
      const data = await createCreator({ userId: this.userStore.user.id });

      if (data) {
        this.$toast.add({
          severity: "success",
          summary: "Успешно",
          detail: "Вы успешно стали креатором!",
          life: 3000,
        });
      }
    },
    handleCreator() {
      this.$confirm.require({
        group: "creator",
        message:
          "Вы хотите создать профиль креатора? Это действие позволит вам публиковать эксклюзивный контент и получать поддержку от ваших подписчиков.",
        header: "Создание профиля креатора",
        accept: () => {
          this.createCreator();
        },
        reject: () => {},
      });
    },
    toggleMenu(event: object) {
      console.log(event);
      this.$refs.menu.toggle(event);
    },
    async logout() {
      try {
        const data = await logout();
        if (data) {
          location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async goTo(routeName: string) {
      if (routeName === "logout") {
        await this.logout();
        return;
      }

      const routeOptions: any = { name: routeName };

      if (routeName === "profile") {
        routeOptions.params = { userId: this.userStore.user.id };
      }

      this.$router.push(routeOptions);
    },
  },
});
</script>

<template>
  <div>
    <Menubar :model="links" class="mx-10 mt-10">
      <template #start>
        <router-link :to="{ name: 'recommendations' }">
          <img
            src="../../../assets/ledokol.png"
            style="width: 40px"
            alt="logo"
          />
        </router-link>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <div>
          <router-link
            :to="{ name: item.routeName }"
            class="flex items-center"
            :class="{ active: item.routeName === $route.name }"
          >
            <div class="px-3 py-2 flex items-center">
              <span
                :class="item.icon"
                class="text-gray-500 mr-2"
                style="font-size: 1.2rem"
              />
              <span>{{ item.title }}</span>
            </div>
          </router-link>
        </div>
      </template>

      <template #end>
        <div class="flex items-center gap-2">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText placeholder="Поиск" size="small" />
          </IconField>

          <Button
            v-if="userStore.user.role === 'USER'"
            label="Стать креатором"
            severity="info"
            icon="pi pi-sparkles"
            size="small"
            @click="handleCreator"
          />
          <Button
            v-if="
              ['CREATOR', 'ADMIN'].includes(userStore.user.role) &&
              $route.name !== 'studioWrapper'
            "
            label="Ledokol студия"
            severity="primary"
            size="small"
            @click="goTo('studioWrapper')"
          />

          <div
            class="hover:bg-gray-200 flex items-center justify-center mx-1"
            style="
              border-radius: 50%;
              width: 35px;
              height: 35px;
              transition: 0.3s ease;
            "
          >
            <OverlayBadge
              severity="danger"
              class="flex items-center mx-3 notifications cursor-pointer"
              style=""
            >
              <i class="pi pi-bell" style="font-size: 1.3rem" />
            </OverlayBadge>
          </div>

          <div @click="toggleMenu" class="cursor-pointer">
            <Avatar
              v-if="userStore.user.avatar_url"
              :image="userStore.user.avatar_url"
            />
            <Avatar
              v-else
              :label="userStore.user.username[0].toLocaleUpperCase()"
            />
          </div>

          <TieredMenu
            ref="menu"
            id="overlay_tmenu"
            :model="menuLinks"
            popup
            style="cursor: pointer"
          >
            <template #item="{ item, props, hasSubmenu }">
              <div class="p-1 flex items-center" @click="goTo(item.routeName)">
                <span :class="item.icon" class="mr-2 ml-1 text-gray-500"></span>
                <span>
                  {{ item.label }}
                </span>
              </div>
            </template>
          </TieredMenu>
        </div>
      </template>
    </Menubar>

    <div class="mx-10">
      <router-view></router-view>
    </div>
    <Toast></Toast>

    <ConfirmDialog group="creator">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div
          class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded"
        >
          <div
            class="rounded-full bg-black text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20"
          >
            <i class="pi pi-question text-5xl" style="color: #fff"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-6">{{
            message.header
          }}</span>
          <p class="mb-0">{{ message.message }}</p>
          <p class="mb-0" v-html="terms"></p>
          <div class="flex items-center gap-2 mt-6">
            <Button
              label="Отмена"
              outlined
              @click="rejectCallback"
              class="w-32"
              size="small"
            ></Button>
            <Button
              label="Стать креатором"
              @click="acceptCallback"
              class="w-full"
              size="small"
            ></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>

<style lang="scss" scoped>
.p-inputicon {
  margin-top: -10px;
}
.active {
  background-color: rgb(241 245 249);
  border-radius: 7px;
}
</style>
