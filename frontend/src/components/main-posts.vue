<script lang="ts">
import {
  commentPost,
  getPosts,
  likePost,
  removePost,
  unlikePost,
} from "@/api/homepagePosts";
import { getUser, getUsers } from "@/api/homepageUser";
import { defineComponent } from "vue";

export default defineComponent({
  name: "main-posts",
  props: {
    filters: Object,
    lang: String,
  },
  data() {
    return {
      posts: [],
      users: [],

      isMyProfilePosts: false,

      title: "",

      comment: "",
    };
  },
  async mounted() {
    this.users = await getUsers();
    await this.getPosts();
    if (this.filters && this.filters.isMyProfile) {
      this.isMyProfilePosts = true;
    }
  },
  methods: {
    async commentPost(post_id: number) {
      const { data } = await commentPost(this.comment, post_id, this.user_id());
      console.log(data);
      if (data.success) {
        const data = await getPosts({ post_id });
        console.log(data[0], "wtf");
        const newPost = data[0];
        const postIndex = this.posts.findIndex(
          (post) => post._id === newPost._id
        );

        if (postIndex !== -1) {
          // Обновите массив likes в посте
          const updatedPost = {
            ...this.posts[postIndex],
            likes: newPost.likes, // Предположим, что newPost содержит обновленный массив likes
          };

          // Обновите пост в массиве
          this.posts[postIndex] = updatedPost;
        }

        this.$message.success("Успешно");
      }
    },
    async unlike(post_id: number) {
      const { data } = await unlikePost(post_id, this.user_id());
      if (data.modifiedCount > 0) {
        // Находим пост в this.posts по post_id
        const post = this.posts.find((post) => post._id === post_id);

        // Удаляем лайк из массива likes поста
        post.likes = post.likes.filter(
          (like) => like.liker_id !== this.user_id()
        );

        console.log("Post unliked successfully.");
      }
    },
    async like(post_id: number) {
      const { data } = await likePost(post_id, this.user_id());
      if (data.modifiedCount > 0) {
        // Находим пост в this.posts по post_id
        const post = this.posts.find((post) => post._id === post_id);

        // Добавляем лайк в массив likes поста
        post.likes.push({
          liker_id: this.user_id(),
          timestamp: Math.floor(new Date().getTime() / 1000),
        });

        console.log("Post liked successfully.");
      }
    },
    async getPosts() {
      let filters = {};
      if (this.filters && !this.filters.isProfile) {
        let user = await getUser(this.filters.user_id);
        console.log(user);
        if (!user.subscriptions.length) {
          this.title = "Нет данных";
          return;
        }
        filters.creators = [...user.subscriptions];
      } else if (this.filters && this.filters.isProfile) {
        filters = { ...this.filters };
      }
      this.posts = await getPosts(filters);
    },
    secondsToTime(seconds: number) {
      const date = new Date(seconds * 1000);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("ru-RU", options);
    },
    truncateDescription(text: string, max_length = 120) {
      if (text.length <= max_length) {
        return text;
      } else {
        const truncatedText = text.slice(0, max_length).trim();
        return `${truncatedText}...`;
      }
    },
    findUserById(id: number) {
      console.log(this.users);
      const user = this.users.find((user) => user.user_id === id);
      console.log(user.username);
      return user.username;
    },
    async edit(post_id: number) {
      this.$router.push({ name: "post-edit", params: { postId: post_id } });
    },
    async remove(post_id: number) {
      this.$confirm("Вы собираетесь удалить пост. Вы уверены?", "Warning", {
        confirmButtonText: "Да",
        cancelButtonText: "Отмена",
        type: "warning",
      }).then(async () => {
        const data = await removePost(post_id);
        if (data.status === 200) {
          this.$message.success("Успешно");
          await this.getPosts();
        } else {
          this.$message.error("Ошибка");
        }
      });
    },
    isULiked(likes: []) {
      const liked = likes.some((like) => like.liker_id === this.user_id());
      return liked;
    },
    user_id() {
      let value = localStorage.getItem("user_id");
      return Number(value);
    },
  },
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-6 my-6">
      <div
        v-for="post in posts"
        v-if="posts.length"
        class="flex justify-between"
      >
        <div>
          <p class="text-gray-400 text-sm my-1 p-0">
            {{ secondsToTime(post.timestamp) }}
          </p>
          <div class="flex">
            <div>
              <el-avatar class="mr-1.5 my-0.5" size="small">
                {{ findUserById(post.user_id) }}
              </el-avatar>
              <span
                class="username-link text-gray-600 text-sm"
                @click="
                  $router.push({
                    name: 'profile',
                    params: { userId: post.user_id },
                  })
                "
                >{{ findUserById(post.user_id) }}</span
              >
              <h2 class="font-bold my-1 title-link" @click="isOpen = true">
                {{ lang === "en" ? post.titleEN : post.titleRU }}
              </h2>
              <p class="text-sm my-2" style="width: 700px">
                {{
                  lang === "en"
                    ? truncateDescription(post.descriptionEN)
                    : truncateDescription(post.descriptionRU)
                }}
              </p>
            </div>
          </div>
          <div v-if="post.preview">
            <div v-if="post.preview.type === 'video'">
              <iframe
                :src="post.preview.source"
                allow="accelerometer; autoplay; clipboard-write; gyroscope; encrypted-media; picture-in-picture; web-share"
                allowfullscreen
                class="m-0 p-0"
                frameborder="0"
                height="300"
                style="border-radius: 10px"
                title="YouTube video player"
                width="700"
              ></iframe>
            </div>
            <div v-else-if="post.preview.type === 'image'">
              <img
                :src="post.preview.source"
                alt=""
                style="
                  max-width: 700px;
                  max-height: 300px;
                  width: auto;
                  height: auto;
                  border-radius: 5px;
                "
              />
            </div>
            <div v-else v-html="post.preview.source"></div>
          </div>

          <div>
            <div class="mt-2">
              <el-button
                v-if="isULiked(post.likes)"
                circle
                class="flex items-center justify-center"
                @click="unlike(post._id)"
              >
                <font-awesome-icon icon="fa-solid fa-heart" />
              </el-button>
              <el-button
                v-else
                circle
                class="flex items-center justify-center"
                @click="like(post._id)"
              >
                <font-awesome-icon icon="fa-regular fa-heart" />
              </el-button>
            </div>
          </div>
          <div>
            <el-input v-model="comment">
              <template #append>
                <el-button @click="commentPost(post._id)">
                  <el-icon><Position /></el-icon>
                </el-button>
              </template>
            </el-input>
            <div v-if="post.comments" class="space-y-4">
              <div
                v-for="comment in post.comments"
                :key="comment.comment_id"
                class="comment p-4"
              >
                <div class="comment-header flex items-center mb-2">
                  <el-avatar> {{ comment.user.username }}</el-avatar>
                  <div class="user-info ml-2">
                    <span class="username font-semibold">{{
                      comment.user.username
                    }}</span>
                    <span class="timestamp ml-3 text-sm text-gray-500">{{
                      new Date(comment.timestamp * 1000).toLocaleString()
                    }}</span>
                  </div>
                </div>
                <div class="comment-body">
                  <div class="comment-text text-gray-800">
                    {{ comment.text }}
                  </div>
                  <div class="comment-actions mt-2">
                    <button
                      class="action-btn text-blue-500"
                      @click="replyToComment(comment.comment_id)"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isMyProfilePosts" class="pt-2">
          <el-button
            plain
            round
            size="small"
            type="primary"
            @click="edit(post._id)"
            >Редактировать</el-button
          >
          <el-button
            plain
            round
            size="small"
            type="danger"
            @click="remove(post._id)"
            >Удалить</el-button
          >
        </div>
      </div>
      <div v-else>
        {{ title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
.username-link:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
