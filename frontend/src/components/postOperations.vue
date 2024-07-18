<script>
import { createPost } from "@/api/createPost.js";
import { editPost, getPosts } from "@/api/homepagePosts.js";
import axios from "axios";

export default {
  name: "postOperations",
  props: {
    isEdit: {
      default: false,
    },
    postId: {
      default: 0,
    },
    lang: String,
  },
  data() {
    return {
      post: {
        user_id: null,
        titleRU: "",
        titleEN: "",
        descriptionRU: "",
        descriptionEN: "",
        timestamp: Math.floor(Date.now() / 1000),
        preview: {},
      },
    };
  },
  async mounted() {
    if (this.isEdit) {
      this.title =
        this.lang === "ru" ? "Редактирование поста" : "Editing the post";
      const data = await getPosts({ post_id: this.postId });
      let post = data[0];

      this.post.titleRU = post.titleRU;
      this.post.titleEN = post.titleEN;
      this.post.descriptionRU = post.descriptionRU;
      this.post.descriptionEN = post.descriptionEN;
      this.post._id = post._id;
    }
  },
  methods: {
    async createPost() {
      this.post.user_id = this.user_id();

      if (
        this.post.titleEN.length === 0 ||
        this.post.titleRU.length === 0 ||
        this.post.descriptionEN.length === 0 ||
        this.post.descriptionRU.length === 0
      ) {
        this.$message.error("Заполните данные");
      } else {
        const data = await createPost(this.post);
        console.log(data);
        this.$message.success("Успешно");
        this.$router.push({
          name: "profile",
          params: { userId: this.user_id() },
        });
      }
    },
    async editPost(id) {
      this.post.user_id = this.user_id();
      this.post._id = id;
      console.log(this.post);
      const data = await editPost(this.post);
      if (data.status === 200) {
        this.$message.success("Успешно");
        this.$router.push({
          name: "profile",
          params: { userId: this.user_id() },
        });
      } else {
        this.$message.error("Ошибка");
      }
    },
    user_id() {
      let value = localStorage.getItem("user_id");
      return value;
    },
  },
  computed: {
    title() {
      // this.lang === 'ru' ? 'Создание поста' : 'Creating the post'
      if (this.lang === "ru") {
        return "Создание поста";
      } else {
        return "Creating the post";
      }
    },
    editTitle() {
      // this.lang === 'ru' ? 'Создание поста' : 'Creating the post'
      if (this.lang === "ru") {
        return "Редактирование поста";
      } else {
        return "Editing the post";
      }
    },
  },
};
</script>

<template>
  <div class="my-4">
    <h1 class="text-3xl font-medium mx-4">{{ isEdit ? editTitle : title }}</h1>
    <div class="flex justify-around">
      <div
        class="flex flex-col justify-start items-start align-middle gap-4 my-4"
      >
        <el-input
          v-model="post.titleRU"
          placeholder="Заголовок поста"
          style="width: 700px"
          size="large"
          required
        ></el-input>
        <el-input
          v-model="post.titleEN"
          placeholder="Title of the post"
          style="width: 700px"
          size="large"
          required
        ></el-input>

        <el-input
          v-model="post.descriptionRU"
          :rows="4"
          type="textarea"
          placeholder="Описание поста"
          style="width: 700px"
          required
        />
        <el-input
          v-model="post.descriptionEN"
          :rows="4"
          type="textarea"
          placeholder="Description of the post"
          style="width: 700px"
          required
        />
        <el-button size="large" @click="createPost" v-if="!isEdit">
          {{ lang === "en" ? "Create post" : "Создать пост" }}
        </el-button>
        <el-button size="large" @click="editPost(post._id)" v-else>
          {{ lang === "en" ? "Edit post" : "Редактировать пост" }}
        </el-button>
      </div>
      <div style="width: 300px">
        <img src="@/assets/createPost.jpg" alt="" style="border-radius: 7px" />
        <h2 class="text-2xl font-medium">
          {{
            lang === "en"
              ? "Bring something of your own into the world"
              : "Принеси в мир что-то свое"
          }}
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
