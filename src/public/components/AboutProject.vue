<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutProject",
  data() {
    return {
      mainAdvantages: [
        {
          title: "Безопасные платежи",
          icon: "pi pi-wallet",
        },
        {
          title: "Минимальная коммиссия",
          icon: "pi pi-percentage",
        },
        {
          title: "Техническая поддержка",
          icon: "pi pi-wrench",
        },
        {
          title: "Подписочная модель",
          icon: "pi pi-calendar",
        },
      ],
      creatorAdvantages: [
        {
          title: "Контроль цен",
          icon: "pi pi-tags",
        },
        {
          title: "Таргетированные цели",
          icon: "pi pi-bullseye",
        },
        {
          title: "Интеграция VR/AR",
          icon: "pi pi-microchip",
        },
        {
          title: "Аналитика и инструменты",
          icon: "pi pi-chart-bar",
        },
      ],
      watcherAdvantages: [
        {
          title: "Геймификация",
          icon: "pi pi-trophy",
        },
        {
          title: "Индивидуальные подписки",
          icon: "pi pi-slack",
        },
        {
          title: "Микротранзакции",
          icon: "pi pi-dollar",
        },
        {
          title: "Подарок поста",
          icon: "pi pi-gift",
        },
      ],
    };
  },
  methods: {
    handleClick() {
      this.$emit("changeType", "signup");
      this.$emit("openModal");
    },
  },
});
</script>

<template>
  <div class="mt-14">
    <!--	  описание проекта-->
    <div
      class="flex items-center justify-between gap-x-10"
      style="max-width: 1200px; margin: 0 auto"
    >
      <div style="width: 500px">
        <p class="mini-title">О Ledokol</p>
        <div class="mt-5 text-lg">
          Мы стремимся создать пространство, где творческие личности могут
          получать поддержку и вдохновение от своих поклонников. Наша платформа
          позволяет креаторам легко монетизировать свои таланты, а их
          поклонникам – наслаждаться эксклюзивным контентом.
        </div>
      </div>
      <img src="../../assets/5.png" alt="space" style="width: 450px" />
    </div>

    <!--	  преимущества-->
    <div class="mt-20 text-center flex flex-col items-center justify-center">
      <p class="mini-title">Почему Ledokol?</p>
      <div class="mt-5 text-lg text-center" style="width: 500px">
        На нашей платформе креаторы могут быстро и просто получать поддержку от
        своих поклонников, а пользователи могут наслаждаться уникальным
        контентом и участвовать в специальных мероприятиях.
      </div>

      <div class="mt-6 flex gap-2">
        <div v-for="advantage in mainAdvantages">
          <Chip :label="advantage.title" :icon="advantage.icon" />
        </div>
      </div>

      <div class="flex mt-6 pb-10 relative">
        <div>
          <p class="font-semibold text-xl mb-3" style="color: rgb(33, 53, 71)">
            Креаторам
          </p>
          <div class="flex flex-wrap gap-2 justify-center" style="width: 500px">
            <div v-for="advantage in creatorAdvantages">
              <Chip :label="advantage.title" :icon="advantage.icon" />
            </div>
          </div>
        </div>
        <Divider layout="vertical"></Divider>
        <div>
          <p class="font-semibold text-xl mb-3" style="color: rgb(33, 53, 71)">
            Пользователям
          </p>
          <div class="flex flex-wrap gap-2 justify-center" style="width: 500px">
            <div v-for="advantage in watcherAdvantages">
              <Chip :label="advantage.title" :icon="advantage.icon" />
            </div>
          </div>
        </div>

        <img
          src="../../assets/teaching.png"
          class="absolute"
          style="width: 250px; left: -300px; top: -250px"
        />
        <img
          src="../../assets/relax.png"
          class="absolute"
          style="width: 250px; right: -300px"
        />
      </div>
    </div>

    <!--	  call to action-->
    <div class="mt-32 mb-14">
      <Panel>
        <div
          class="flex gap-x-10 p-5"
          style="max-width: 1200px; margin: 0 auto"
        >
          <div class="flex flex-col items-start gap-5">
            <div class="flex items-center">
              <img src="../../assets/ledokol.png" class="logo" />
              <p class="inline text-2xl font-semibold">Ledokol</p>
            </div>
            <p class="text-3xl font-semibold">
              Зарегистрируйтесь сейчас и станьте частью нашего уникального
              сообщества.
            </p>
            <Button
              severity="info"
              icon="pi pi-sparkles"
              label="Создать страницу"
              @click="handleClick"
            ></Button>
          </div>

          <img src="../../assets/blogging.png" style="width: 400px" />
        </div>
      </Panel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 50px;
  display: inline;
}
.mini-title {
  @apply text-3xl font-semibold;
  color: rgb(33, 53, 71);
}
</style>
