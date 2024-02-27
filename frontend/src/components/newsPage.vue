<script>
import HomepageHeader from "@/components/Homepage/components/homepage-header.vue";
import axios from 'axios';
export default {
  name: "newsPage",
  components: {HomepageHeader},
  data(){
    return{
      news:[],
    }
  },
  async mounted(){
    const {data} = await axios.get('https://newsapi.org/v2/everything?q=games&from=2024-01-26&sortBy=publishedAt&apiKey=f9dc9bdaa7464fffb63737e02b2798a8')
    this.news = [...data.articles];
    console.log(this.news)
  }
}
</script>

<template>
  <div style="max-width: 1280px; margin: 0 auto">
    <div>
      <homepage-header :active-link="'news'"></homepage-header>

    </div>
    <h1 style="font-weight: 600; font-size: 32px" class="my-5">Новости</h1>
    <div v-for="article in news" class="article">
      <img v-if="article.urlToImage" :src="article.urlToImage" class="article__image" alt="IndieWire Image">
      <div class="article__content">
        <h2 class="article__title">{{ article.title }}</h2>
        <p class="article__description">{{article.description}}</p>
        <p class="article__metadata">Published by {{article.author}} on {{ article.publishedAt }}</p>
        <a :href="article.url" class="article__link">Read More</a>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.article {
  display: flex;
  margin-bottom: 20px;
}

.article__image {
  width: 30%;
  margin-right: 20px;
}

.article__content {
  flex: 1;
}

.article__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.article__description {
  margin-bottom: 10px;
}

.article__metadata {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.article__link {
  color: #0066cc;
  text-decoration: none;
}

.article__link:hover {
  text-decoration: underline;
}

</style>
