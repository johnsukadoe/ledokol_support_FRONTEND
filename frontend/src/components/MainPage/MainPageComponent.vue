<template>
    <div class="body">
        <div class="full-screen">
            <div class="full-screen__body header">
                <main-page-header></main-page-header>
            </div>
            <div class="full-screen__body">
                <div class="full-screen__subtext">
                    <h3>поддерживай, вдохновляй, создавай будущее!</h3>
                </div>
                <div class="full-screen__title">
                    <h1>Открой двери творчества</h1>
                </div>
                <div class="full-screen__text">
                    <h2>вместе с Patreon</h2>
                </div>
            </div>
            <video autoplay muted loop preload="auto" class="full-screen__video">
                <source type="video/mp4" src="../../assets/bg4for.mp4">
            </video>
        </div>
        <div class="content">
            <div class="content-container">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae dolores totam velit tempora praesentium veniam aliquam nulla eum illo, necessitatibus corrupti esse cupiditate obcaecati molestias! Animi maxime rerum iste.
            </div>
        </div>
    </div>
</template>

<script>
import MainPageHeader from './components/MainPageHeader.vue'
export default{
    name:'MainPageComponent',
    components:{MainPageHeader}
}
</script>

<style>
    .full-screen{
        position: relative;
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        color: white;
    }
    .full-screen__body{
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
    .full-screen__video{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .full-screen__title{
        font-size: 25px;
        letter-spacing: 10px;
        font-weight: 700;
        margin:0px 0px 20px 0px;
    }
    .full-screen__text{
        font-size: 18px;
        letter-spacing: 15px;
    }
    .full-screen__subtext{
        font-size: 15px;
        letter-spacing: 8px;
    }
    .content{
        position: relative;
        z-index: 5;
        background:#fff;
    }
    .content-container{
        max-width: 1200px;
        margin: 0px auto;
        padding: 0px 15px;
    }
    .header{
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(12.4px);
        -webkit-backdrop-filter: blur(12.4px);

        padding: 0;
        z-index: 1000;
        position: fixed;
        width: 100%;
    }
</style>