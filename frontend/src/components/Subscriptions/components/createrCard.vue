<template>
  <div class="creator-card">
    <div class="creator-info flex justify-between items-center">
      <div>
        <div class="flex items-center gap-2">
          <el-avatar size="default">{{ user.username }}</el-avatar>
          <h2 @click="$router.push({name:'profile', params:{userId:user.user_id}})">{{ user.username }}</h2>
        </div>
        <div class="flex mt-3 gap-2">
          <p>{{ user.subscribers }} subscribers </p>
          <p>{{ user.total_posts }} posts</p>
        </div>
        <p>{{ user.channel_description }}</p>

      </div>

      <el-button type="danger" plain class="ml-5" @click="unsub">Отписаться</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "createrCard",
  props:['user'],
  methods:{
    // $emit('unsubscribe', user.user_id)"
    unsub(){
      this.$emit('unsubscribe', this.user.user_id)
    }
  }
}
</script>

<style scoped lang="scss">
.creator-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
  width: 80%;
  margin: 20px auto;
}

.creator-info {
  flex: 1;
  padding: 16px;
}

.creator-info h2 {
  font-size: 18px;
  font-weight: 700;
}
.creator-info:hover h2 {
  text-decoration: underline;
  cursor: pointer;
}

.creator-info p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #666;
}

.creator-info p.subscribers {
  color: #ff0000;
  font-weight: 700;
}

.creator-info p.posts {
  color: #00ff00;
  font-weight: 700;
}
</style>
