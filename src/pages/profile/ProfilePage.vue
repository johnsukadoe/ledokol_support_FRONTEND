<script lang="ts">
import { getCreator } from "@/api/creatorAPI.ts";
import {
  getSubscriptions,
  subscribeCreator,
  unsubscribeCreator,
} from "@/api/subscriptionAPI.ts";
import { getUser } from "@/api/userAPI.ts";
import MainPosts from "@/components/PostsList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfilePage",
  components: { MainPosts },
  data() {
    return {
      isMyProfile: false,
      isISubToHim: false,

      filters: {
        isProfile: true,
        user_id: this.$route.params.userId,
        isMyProfile: false,
      },

      user: {},

      lang: "",
    };
  },
  async mounted() {
    if (Number(this.$route.params.userId) === Number(this.user_id())) {
      this.isMyProfile = true;
      this.filters.isMyProfile = true;
    }
    let data = await getUser(this.$route.params.userId);

    if (data.role === "creator" || data.role === "admin") {
      data = await getCreator(this.$route.params.userId);
    }
    this.user = data;

    if (!this.isMyProfile) {
      let checkSubscriptions = await getSubscriptions(this.user_id());
      console.log(checkSubscriptions);
      checkSubscriptions.forEach((sub) => {
        if (Number(sub.user_id) === Number(this.$route.params.userId)) {
          this.isISubToHim = true;
        }
      });
    }
    console.log(this.isISubToHim);

    this.lang = localStorage.getItem("lang");
  },
  methods: {
    async unsubscribe(creator_id) {
      this.$confirm(
        "Вы собираетесь отписаться от аккаунта. Вы уверены?",
        "Warning",
        {
          confirmButtonText: "Да",
          cancelButtonText: "Отмена",
          type: "warning",
        }
      )
        .then(async () => {
          let params = {
            creator_id,
            user_id: this.user_id(),
          };
          console.log(params);
          const res = await unsubscribeCreator(params);
          if (res) {
            this.$message.success("Вы отменили подписку.");
            this.isISubToHim = false;
          }
        })
        .catch(() => {
          this.$message.error("Ошибка.");
        });
    },
    async subscribe(creator_id) {
      let params = {
        creator_id,
        user_id: this.user_id(),
      };
      const data = await subscribeCreator(params);
      console.log(data);
      if (data.message === "Successfully subscribed.") {
        this.$message.success("Успешно");
        this.isISubToHim = true;
      }
    },
    user_id() {
      let value = localStorage.getItem("user_id");
      return value;
    },
    editLang(lang) {
      console.log(lang);
      this.lang = lang;
    },
  },
});
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <div
      v-if="user"
      class="flex flex-row justify-between items-center mt-5"
      style="border-bottom: 1px solid #ccc; padding-bottom: 25px"
    >
      <div class="flex items-center gap-4">
        <el-avatar size="large">{{ user.username }}</el-avatar>
        <div>
          <h1>{{ user.username }}</h1>
          <div v-if="(user.role = 'creator')" class="flex text-slate-500 gap-2">
            <p>
              {{ user.subscribers }}
              {{ lang === "en" ? "subscribers" : "подписчиков" }}
            </p>
            <p>
              {{ user.total_posts }}
              {{ lang === "en" ? "posts" : "постов" }}
            </p>
          </div>
        </div>

        <div>
          <el-button
            v-if="isMyProfile"
            plain
            round
            type="primary"
            @click="
              $router.push({ name: 'settings', params: { userId: user_id() } })
            "
          >
            {{ lang === "en" ? "Profile settings" : "Настройка профиля" }}
          </el-button>
          <el-button
            v-if="!isISubToHim && !isMyProfile"
            plain
            round
            type="success"
            @click="subscribe(user.user_id)"
          >
            {{ lang === "en" ? "Subscribe" : "Подписаться" }}
          </el-button>
          <el-button
            v-if="isISubToHim"
            plain
            round
            type="danger"
            @click="unsubscribe(user.user_id)"
          >
            {{ lang === "en" ? "Unsubscribe" : "Отписаться" }}
          </el-button>
        </div>
      </div>
      <div class="text-slate-500" style="font-size: 15px; max-width: 500px">
        {{ lang === "en" ? "Description" : "Описание" }}:

        {{ user.channel_description }}
      </div>
    </div>

    <div>
      <main-posts :filters="filters" :lang="lang"></main-posts>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  font-weight: 600;
}
p {
  font-size: 13px;
}
</style>
