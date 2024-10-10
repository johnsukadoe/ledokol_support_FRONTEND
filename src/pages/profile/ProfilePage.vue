<script lang="ts">
import ProfileTiersPanel from "@/pages/profile/components/creator/ProfileTiersPanel.vue";
import ProfileBeCreatorPanel from "@/pages/profile/components/user/ProfileBeCreatorPanel.vue";
import ProfileSubsPanel from "@/pages/profile/components/user/ProfileSubsPanel.vue";
import useUserStore from "@/store/user.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfilePage",
  components: { ProfileTiersPanel, ProfileSubsPanel, ProfileBeCreatorPanel },
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;
    return {
      user,
    };
  },
  data() {
    return {};
  },
  methods: {
    formatDate(dateString: string) {
      const date = new Date(dateString);

      // Получаем день и название месяца в родительном падеже
      const day: string = date.toLocaleString("ru-RU", { day: "numeric" });
      const month: string = date.toLocaleString("ru-RU", { month: "long" });

      // Преобразуем месяц к нужному падежу
      const formattedDate: string = `Создан ${day} ${month}`;
      return formattedDate;
    },
  },
});
</script>

<template>
  <div class="flex flex-col gap-5">
    <div>
      <Panel header="Профиль" class="mt-6">
        <div class="flex justify-between items-center">
          <div class="flex">
            <div>
              <Avatar
                v-if="user.avatar_url"
                :image="user.avatar_url"
                size="xlarge"
              />
              <Avatar
                v-else
                :label="user.username[0].toLocaleUpperCase()"
                size="xlarge"
              />
            </div>
            <div class="ml-3">
              <p class="text-2xl">
                {{ user.username }}
              </p>
              <p class="text-gray-500 text-sm">
                {{ formatDate(user.created_at) }}
              </p>
            </div>
          </div>
          <div>
            <Button
              label="Редактировать профиль"
              severity="secondary"
              size="small"
            />
          </div>
        </div>
      </Panel>
    </div>
    <div class="flex w-full gap-5">
      <main class="w-full flex flex-col gap-5">
        <!--	      v-if="user.role === 'USER'"-->
        <ProfileBeCreatorPanel></ProfileBeCreatorPanel>
      </main>
      <aside class="w-1/5 flex flex-col gap-5">
        <!--	      v-if="user.role === 'USER'"-->
        <ProfileSubsPanel></ProfileSubsPanel>
        <!--	      v-if="user.role === 'CREATOR' || user.role === 'ADMIN'"-->
        <ProfileTiersPanel></ProfileTiersPanel>
      </aside>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
