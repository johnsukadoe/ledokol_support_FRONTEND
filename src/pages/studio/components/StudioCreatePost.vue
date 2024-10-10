<script lang="ts">
import { createPost } from "@/api/apiPost.ts";
import { getTiers } from "@/api/apiTiers.ts";
import useUserStore from "@/store/user.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StudioCreatePost",
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;
    return {
      user,
    };
  },
  async mounted() {
    const tiers = await getTiers(this.user.creator.id);
    this.tiers = tiers;
  },
  data() {
    return {
      visible: false,
      selectedFiles: [] as File[],

      post: {
        title: "",
        content: "",
        isPublic: false,
        tierId: "",
      },

      selectedTier: {
        benefits: [],
        creatorId: null,
        description: "",
        id: null,
        name: "",
        price: null,
      },
      tiers: [],
    };
  },
  methods: {
    onSelectFiles(event) {
      this.selectedFiles = event.files;
    },

    formatSize(bytes) {
      const k = 1024;
      const dm = 3;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    },

    open() {
      this.visible = true;
    },
    async submitPost() {
      console.log(this.selectedFiles);
      // Проверка, что поля заполнены
      if (
        !this.post.title ||
        !this.post.content ||
        this.selectedFiles.length === 0
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Не удалось создать пост",
          detail: "Заполните данные поста",
          life: 3000,
        });
        return;
      }

      // Формируем данные для отправки
      const formData = new FormData();
      // formData.append("title", this.post.title);
      // formData.append("content", this.post.content);
      formData.append(
        "post",
        JSON.stringify({
          title: this.post.title,
          content: this.post.content,
          creatorId: this.user.creator.id,
          isPublic: this.post.isPublic,
          tierId: this.selectedTier.id,
        }),
      );
      // Добавляем все файлы с общим ключом "files[]"
      this.selectedFiles.forEach((file) => {
        formData.append("files[]", file);
      });

      // console.log(this.userStore.user.creator);
      // formData.append("creatorId", this.userStore.user.creator.id);
      // formData.append("isPublic", true);

      try {
        // Отправляем данные на сервер
        const response = await createPost(formData);

        // if (!response.ok) {
        //   throw new Error(`Ошибка: ${response.statusText}`);
        // }

        console.log("Успешно отправлено:", response);
        alert("Пост успешно создан!");
        this.visible = false; // Закрываем Drawer после успешной отправки
      } catch (error) {
        console.error("Ошибка при отправке:", error);
        alert("Ошибка при создании поста.");
      }
    },
  },
});
</script>

<template>
  <Drawer
    v-model:visible="visible"
    position="right"
    header="Создать пост"
    class="!w-2/5"
  >
    <div class="my-5 w-full flex flex-col gap-y-6">
      <FloatLabel class="w-full">
        <label for="title">Название поста</label>
        <InputText v-model="post.title" type="text" id="title" class="w-full" />
      </FloatLabel>

      <div class="flex flex-col">
        <FloatLabel>
          <Textarea
            v-model="post.content"
            cols="30"
            class="w-full"
            auto-resize
            :invalid="post.content.length > 300"
          />
          <label>Описание поста</label>
        </FloatLabel>
        <Tag
          :value="`${post.content.length}/300`"
          :severity="post.content.length > 300 ? 'danger' : null"
          class="self-end"
        ></Tag>
      </div>
      <div>
        <!--        <input-->
        <!--          type="file"-->
        <!--          name="uploadFile"-->
        <!--          accept="image/*, video/*"-->
        <!--          required-->
        <!--          @change="uploadFile"-->
        <!--        />-->

        <!--	      :maxFileSize="1000000"-->
        <FileUpload
          mode="advanced"
          ref="uploader"
          name="files"
          accept="image/*, video/*"
          customUpload
          :multiple="true"
          @select="onSelectFiles"
        >
          <template
            #header="{ chooseCallback, uploadCallback, clearCallback, files }"
          >
            <div
              class="flex flex-wrap justify-between items-center flex-1 gap-4"
            >
              <div class="flex gap-2">
                <Button
                  @click="chooseCallback()"
                  icon="pi pi-images"
                  rounded
                  outlined
                  severity="secondary"
                ></Button>
                <Button
                  @click="clearCallback()"
                  icon="pi pi-times"
                  rounded
                  outlined
                  severity="danger"
                  :disabled="!files || files.length === 0"
                ></Button>
              </div>
            </div>
          </template>

          <template
            #content="{
              files,
              uploadedFiles,
              removeUploadedFileCallback,
              removeFileCallback,
            }"
          >
            <div class="flex flex-col gap-8 pt-4">
              <div v-if="files.length > 0">
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="(file, index) of files"
                    :key="file.name + file.type + file.size"
                    class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                      />
                    </div>
                    <span
                      class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                      >{{ file.name }}</span
                    >
                    <div>{{ formatSize(file.size) }}</div>
                    <Button
                      icon="pi pi-times"
                      @click="removeFileCallback(index)"
                      outlined
                      rounded
                      severity="danger"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #empty>
            <div class="flex items-center justify-center flex-col">
              <i
                class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
              />
              <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
            </div>
          </template>
        </FileUpload>

        <div class="my-3">
          <Checkbox
            v-model="post.isPublic"
            :binary="true"
            name="isPublic"
            inputId="isPublic"
          />
          <label for="isPublic" class="ml-2">Публичный пост</label>
        </div>

        <div v-if="!post.isPublic" class="mt-7">
          <FloatLabel>
            <Select
              v-model="selectedTier"
              :options="tiers"
              optionLabel="name"
              class="w-full md:w-56"
            />
            <label for="tier">Тир</label>
          </FloatLabel>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-2">
        <Button
          label="Отмена"
          icon="pi pi-times"
          class="flex-auto"
          size="small"
          outlined
        ></Button>
        <Button
          label="Создать"
          size="small"
          icon="pi pi-check"
          class="flex-auto"
          severity="info"
          outlined
          @click="submitPost"
        ></Button>
      </div>
    </template>
  </Drawer>
</template>

<style scoped lang="scss">
.p-tag {
  width: 40px;
  height: 25px;
  font-size: 12px;
}
.p-fileupload-upload-button {
  background-color: red;
}
</style>
