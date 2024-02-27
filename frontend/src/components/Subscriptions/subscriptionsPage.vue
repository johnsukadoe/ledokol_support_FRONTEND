<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import {getSubscriptions, unsubscribeCreator} from "@/api/subscriptions.js";
import CreaterCard from "@/components/Subscriptions/components/createrCard.vue";

export default {
  name: "subscriptionsPage",
  components: {CreaterCard, HomepageHeader},
  data(){
    return{
      subscriptions: {},

      lang:'',
    }
  },
  async mounted() {
    console.log(this.user_id())
    this.subscriptions = await getSubscriptions(this.user_id());
    console.log(this.subscriptions)

    this.lang = localStorage.getItem('lang')

  },
  methods:{
    user_id(){
      let value = localStorage.getItem('user_id');
      return Number(value)
    },
    async unsubscribe(creator_id){
      this.$confirm(
          'Вы собираетесь отписаться от аккаунта. Вы уверены?',
          'Warning',
          {
            confirmButtonText: 'Да',
            cancelButtonText: 'Отмена',
            type: 'warning',
          }
      ).then(async () => {
        let params = {
          creator_id,
          user_id: this.user_id()
        }
        console.log(params)
        const res = await unsubscribeCreator(params)
        if(res){
          this.$message.success('Вы отменили подписку.')
        }
        this.subscriptions = await getSubscriptions(this.user_id());
      })
      .catch(() => {
        this.$message.error('Вы отказались отписаться.')
      })
    },
    editLang(lang){
      console.log(lang)
      this.lang = lang;
    }
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <homepage-header :activeLink="'subscriptions'" @editLang="editLang"></homepage-header>
    <div class="my-5 mx-8">
      <div v-for="creater in subscriptions" >
        <creater-card :user="creater" @unsubscribe="unsubscribe" :lang="lang"></creater-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>