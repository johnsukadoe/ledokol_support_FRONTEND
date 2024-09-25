<script lang="ts">
import { logout } from "@/api/apiAuth.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePageNav",
  setup() {
    return {};
  },
  data() {
    return {
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
          label: "Аналитика",
          routeName: "analytics",
          icon: "pi pi-chart-pie",
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
    toggleMenu(event: object) {
      console.log(event);
      this.$refs.menu.toggle(event);
    },
    // async getUser() {
    //   try {
    //     console.log(this.user_id());
    //     const data = await getUser(this.user_id());
    //     this.username = data.username;
    //     if (data.role === "admin") {
    //       this.isAdmin = true;
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //     return;
    //   }
    // },
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
      this.$router.push({
        name: routeName,
      });
    },
  },
});
</script>

<template>
  <div>
    <Menubar :model="links" class="mx-10 mt-10">
      <template #start>
        <router-link :to="{ name: 'recommendations' }">
          <img src="@/assets/ledokol.png" style="width: 40px" alt="logo" />
        </router-link>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <div>
          <router-link :to="{ name: item.routeName }" class="flex items-center">
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
            label="Стать креатором"
            severity="info"
            icon="pi pi-sparkles"
            size="small"
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

          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
            @click="toggleMenu"
          />
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

    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.p-inputicon {
  margin-top: -10px;
}
</style>
