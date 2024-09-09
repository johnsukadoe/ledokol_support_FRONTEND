<template>
  <div style="overflow: hidden">
    <div class="card p-5">
      <!--	    :model="items"-->
      <Menubar style="max-width: 1200px; margin: 0 auto">
        <template #start>
          <router-link to="">
            <div class="flex items-center">
              <img src="../assets/ledokol.png" class="logo" />
            </div>
          </router-link>
          <Select
            v-model="lang"
            :options="langs"
            optionLabel="name"
            class="ml-3 flex items-center"
            style="height: 35px"
          >
            <template #value="slotProps">
              <span>
                <i class="pi pi-globe"></i>
                {{ slotProps.value.name }}
              </span>
            </template>
            <template #option="slotProps">
              <img
                :alt="slotProps.option.name"
                :src="`https://flagcdn.com/16x12/${slotProps.option.code.toLowerCase()}.png`"
                :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
                style="width: 18px"
              />
              <span>{{ slotProps.option.name }}</span>
            </template>
          </Select>
        </template>
        <template #end>
          <div class="flex gap-2.5">
            <Button
              label="Регистрация"
              severity="info"
              size="small"
              @click="
                showAuth = true;
                typeAuth = 'signup';
              "
            />
            <Button
              label="Войти"
              size="small"
              severity="success"
              @click="
                showAuth = true;
                typeAuth = 'signin';
              "
            />
          </div>
        </template>
      </Menubar>
    </div>
    <main class="flex flex-col gap-y-6 items-center justify-center mt-10">
      <div class="title" style="width: 70%">
        <div class="not-rainbow">
          Поддержите таланты,
          <span class="rainbow">развивайтесь</span>
          вместе
        </div>
      </div>

      <div class="text-gray-500 text-2xl">
        Станьте частью успешных историй: Поддержка талантов через краудфандинг.
      </div>

      <div class="flex gap-4">
        <Button
          label="Создать страницу"
          severity="info"
          icon="pi pi-sparkles"
          @click="
            showAuth = true;
            typeAuth = 'signup';
          "
        />
        <Button label="О Ledokol" severity="info" outlined />
      </div>

      <div class="sponsors w-full mt-14">
        <Divider />
        <div
          style="height: 80px"
          class="flex flex-col items-center justify-center"
        >
          <p class="text-xl font-semibold mb-2" style="color: rgb(33, 53, 71)">
            Спонсоры
          </p>
          <div class="sponsors mb-2">
            <a href="#">
              <img
                src="../assets/appwrite.svg"
                style="width: 200px"
                alt="appwrite"
              />
            </a>
          </div>
        </div>
        <Divider />
      </div>

      <AboutProject
        @changeType="changeType"
        @openModal="showAuth = true"
      ></AboutProject>
    </main>

    <AuthWindow
      :showAuth="showAuth"
      :type="typeAuth"
      @hideAuth="showAuth = false"
      @changeType="changeType"
    ></AuthWindow>
  </div>
</template>

<script lang="ts">
import AboutProject from "@/public/components/AboutProject.vue";
import AuthWindow from "@/public/components/AuthWindow.vue";
import MainPageHeader from "@/public/components/PublicPageNav.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PublicPage",
  computed: {},
  components: { AuthWindow, MainPageHeader, AboutProject },
  data() {
    return {
      lang: { name: "Русский", code: "ru" },
      langs: [
        { name: "Русский", code: "ru" },
        { name: "Казахский", code: "kz" },
        { name: "Английский", code: "us" },
      ],
      showAuth: false,
      typeAuth: "signin",

      // items: [
      //   {
      //     label: "Home",
      //     icon: "pi pi-home",
      //   },
      //   {
      //     label: "Features",
      //     icon: "pi pi-star",
      //   },
      //   {
      //     label: "Projects",
      //     icon: "pi pi-search",
      //     items: [
      //       {
      //         label: "Components",
      //         icon: "pi pi-bolt",
      //       },
      //       {
      //         label: "Blocks",
      //         icon: "pi pi-server",
      //       },
      //       {
      //         label: "UI Kit",
      //         icon: "pi pi-pencil",
      //       },
      //       {
      //         label: "Templates",
      //         icon: "pi pi-palette",
      //         items: [
      //           {
      //             label: "Apollo",
      //             icon: "pi pi-palette",
      //           },
      //           {
      //             label: "Ultima",
      //             icon: "pi pi-palette",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     label: "Contact",
      //     icon: "pi pi-envelope",
      //   },
      // ],
    };
  },
  mounted() {
    // if (this.user_id()) {
    //   this.$router.push({ name: "homepage" });
    // }
  },
  methods: {
    changeType(val: string) {
      this.typeAuth = val;
    },
    user_id() {
      let value = localStorage.getItem("user_id");
      return value;
    },
  },
});
</script>

<style scoped lang="scss">
.logo {
  width: 35px;
  display: inline;
}
.title {
  font-family: sans-serif;
  font-size: 4em;
  font-weight: 700;
  line-height: 1.2;

  text-align: center;

  color: rgb(33, 53, 71);
  div {
    display: inline;
  }
}

.rainbow {
  background: linear-gradient(90deg, #55aa7f, #55aaff, #55aa7f, #55aaff);
  background-size: 400%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: rainbow 4s linear infinite;
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
