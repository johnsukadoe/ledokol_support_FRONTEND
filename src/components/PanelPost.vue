<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PanelPost",
  props: ["post"],
  data() {
    return {
      isExpanded: false, // состояние развернутости контента
    };
  },
  computed: {
    truncatedContent() {
      // Если контент развернут, показываем полный текст, иначе первые 200 символов с "..."
      return this.isExpanded
        ? this.post.content
        : this.post.content.slice(0, 200) +
            (this.post.content.length > 200 ? "..." : "");
    },
  },
  methods: {
    toggleContent() {
      this.isExpanded = !this.isExpanded; // переключаем состояние
    },
    // getImageClass(index) {
    //   const imageCount = this.post.files.filter((file) =>
    //     file.type.startsWith("image"),
    //   ).length;
    //
    //   if (imageCount === 1) {
    //     return "single-image";
    //   } else if (imageCount === 2) {
    //     return "two-images";
    //   } else if (imageCount === 3) {
    //     return index === 0 ? "large-image" : "small-image";
    //   } else if (imageCount === 4) {
    //     return "four-images";
    //   } else {
    //     return index === 0 ? "large-image" : "small-image"; // Для 5+ изображений
    //   }
    // },
    getImageWrapperClass() {
      const imageCount = this.post.files.filter((file) =>
        file.type.startsWith("image"),
      ).length;

      if (imageCount === 1) {
        return "single-image";
      } else if (imageCount === 2) {
        return "two-images";
      } else if (imageCount === 3) {
        return "three-images";
      } else if (imageCount === 4) {
        return "four-images";
      } else {
        return "five-images";
      }
    },
  },
});
</script>

<template>
  <div>
    <Panel :header="post.title">
      <p>{{ truncatedContent }}</p>
      <a
        v-if="post.content.length > 200"
        href="#"
        @click.prevent="toggleContent"
      >
        {{ isExpanded ? "Свернуть" : "Читать дальше" }}
      </a>

      <div>
        <!-- Видео отображается всегда первым -->
        <div
          v-if="post.files.some((file) => file.type.startsWith('video'))"
          class="video-item"
        >
          <video controls>
            <source
              :src="
                post.files.find((file) => file.type.startsWith('video')).url
              "
            />
          </video>
        </div>

        <!-- Фотографии отображаются после видео, макс. 5 штук -->
        <div
          v-if="post.files.some((file) => file.type.startsWith('image'))"
          class="images"
          :class="getImageWrapperClass()"
        >
          <div
            v-for="(file, index) in post.files
              .filter((file) => file.type.startsWith('image'))
              .slice(0, 5)"
            :key="file.url"
          >
            <Image
              :src="file.url"
              :alt="post.title"
              preview
              class="some-image"
            />
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>
<style scoped>
.images {
  display: grid;
}
.single-image {
  .some-image {
    width: 300px;
    height: 300px;
    object-fit: fill;
  }
}
</style>
