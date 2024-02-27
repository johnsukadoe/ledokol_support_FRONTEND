<template>
    <div class="body">
        <div class="full-screen">
            <div class="full-screen__body header">
                <main-page-header></main-page-header>
            </div>
            <div class="full-screen__body">
                <div class="full-screen__subtext">
                    <h3 class="font-bold text-lg">поддерживай, вдохновляй, создавай будущее!</h3>
                </div>
                <div class="full-screen__title">
                    <h1 class="font-bold text-3xl my-5">Открой двери творчества</h1>
                </div>
                <div class="full-screen__text">
                    <h2 class="font-bold text-2xl">вместе с ledokol</h2>
                </div>
              <div class="full-screen__button">
                <button @click="$router.push({ name: 'RegisterPage', query:{isSignUp:true} });">Создать комнату</button>
              </div>
            </div>
            <video autoplay muted loop preload="auto" class="full-screen__video">
                <source type="video/mp4" src="../../assets/bg4for.mp4">
            </video>
        </div>
        <div class="contentCSS">
        </div>
    </div>
</template>

<script>
import MainPageHeader from '@/components/MainPage/components/MainPageHeader.vue';
export default{
  name:'MainPageComponent',
  components:{MainPageHeader},
  mounted() {
    if(this.$store.state.user_id){
      this.$router.push({name:'homepage'})
    }
  }
}
</script>

<style scoped lang="scss">
.full-screen {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
}

.full-screen__body {
  padding: 50px 15px;
  background-color: #0000006e;
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-transform: uppercase;
}

.full-screen__video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.full-screen__title {
  font-size: 25px;
  letter-spacing: 10px;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.full-screen__text {
  font-size: 18px;
  letter-spacing: 15px;
}

.full-screen__subtext {
  font-size: 15px;
  letter-spacing: 8px;
}

.full-screen__button {
  margin-top: 20px;
}

.full-screen__button button {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
}

.full-screen__button button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.full-screen__button button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.8);
  transition: box-shadow 0.5s ease;
}

.full-screen__button button:hover::before {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.contentCSS {
  position: relative;
  z-index: 20000;
  background: #fff;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.header {
  backdrop-filter: blur(12.4px);
  -webkit-backdrop-filter: blur(12.4px);
  padding: 0;
  z-index: 1000;
  position: fixed;
  width: 100%;
  align-items: stretch;
}
</style>
