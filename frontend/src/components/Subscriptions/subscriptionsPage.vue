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
    }
  },
  async mounted() {
    console.log(this.user_id)
    this.subscriptions = await getSubscriptions(this.user_id);
    console.log(this.subscriptions)
  },
  computed:{
    user_id(){
      return this.$store.state.userid
    },
  },
  methods:{
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
          user_id: this.user_id
        }
        console.log(params)
        const res = await unsubscribeCreator(params)
        if(res){
          this.$message.success('Вы отменили подписку.')
        }
        this.subscriptions = await getSubscriptions(this.user_id);
      })
      .catch(() => {
        this.$message.error('Вы отказались отписаться.')
      })


    }
  }
}
</script>

<template>
  <div>
    <homepage-header :activeLink="'subscriptions'"></homepage-header>
    <div class="my-5 mx-8">
      <div v-for="creater in subscriptions" >
        <creater-card :user="creater" @unsubscribe="unsubscribe"></creater-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>