<template>
  <div class="pb-16 pt-16">
    <v-container>
      <v-card>
        <v-tabs
          v-model="currentTab"
          align-with-title
          background-color="primary"
          dark
          centered
          grow
        >
          <v-tabs-slider color="white"></v-tabs-slider>
          <v-tab
            v-for="(item, index) in tabs"
            :key="index"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="currentTab">
          <v-tab-item
            v-for="(item, index) in tabs"
            :key="index"
          >
            <v-row>
              <v-col cols="12" v-for="(el, elIndex) in contentTab" :key="elIndex" md="6" lg="3">
                  <media-card-component :card-data="el" @delete="deleteImg"/>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
        <v-form @submit.prevent="createImg" ref="form">
          <v-card-title>
            <div class="media-component__input">
              <v-file-input
                v-model="image"
                prepend-icon="mdi-camera"
                accept="image/png, image/jpeg, image/bmp"
                @change="selectImage"
                @click:clear="clearImagePreview()"
                label="Выбрать файл"
                :rules="[v => !!v || 'заполните поле']"
                required
              ></v-file-input>
              <v-textarea
                v-model="keyName"
                label="Image name"
                rows="1"
                :rules="[v => !!v || 'заполните поле']"
                required
              >
              </v-textarea>
            </div>
          </v-card-title>
          <v-card-text>
            <v-sheet class="v-sheet--box media-component__input">
              <v-img
                :src="imagePreview || '/images/no-image.jpeg'"
                aspect-ratio="2"
                contain
              ></v-img>
            </v-sheet>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import MediaCardComponent from "@/components/cards/media-card-component.vue";
import {CreateImg, DeleteImage, GetGroupImage, GetImageByGroup} from "@/service/user";

export default {
  name: "media-component",
  components: {MediaCardComponent},
  data () {
    return {
      currentTab: null,
      image: null,
      imagePreview: "",
      tabs: [],
      contentTab: [],
      keyName: ''
    }
  },
  watch: {
    async currentTab(e) {
      let groupName = this.tabs[e].name
      await this.getImageByGroup(groupName)
    }
  },
  methods: {
    async getGroupImage() {
      try {
        const res = await GetGroupImage()
        this.tabs = res.data
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    },
    async getImageByGroup(e) {
      try {
        const data = await GetImageByGroup(e)
        this.contentTab = data
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    },
    async createImg() {
      if(!this.$refs.form.validate()) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return
      }
      const form = new FormData();
      form.append('image', this.image);
      form.append('key_name', this.keyName)
      form.append('group_id', this.tabs[this.currentTab].id)

      try {
        const res = await CreateImg(form)
        this.$toast.open({
          message: res.message,
          type: "success"
        })
        await this.getImageByGroup(this.tabs[this.currentTab].name)
        this.imagePreview = ''
        this.$refs.form.reset()
      }catch (e) {
        this.$toast.open({
          message: e.response.data.message,
          type: "error"
        })
      }
    },
    async selectImage(e) {
      const file = e;
      if (!file) {
        return;
      }
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      this.imagePreview = data;
    },
    async clearImagePreview() {
      this.imagePreview = "";
    },
    async deleteImg(id) {
      try {
        const res = await DeleteImage(id)
        this.$toast.open({
          message: res.message,
          type: "success"
        })
        await this.getImageByGroup(this.tabs[this.currentTab].name)
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    }
  },
  async mounted() {
    await this.getGroupImage()
    // await this.getImageByGroup(this.tabs[this.currentTab].name)
  }
}
</script>

<style scoped lang="scss">
.media-component__input {
  width: 100%;
  max-width: 500px;
}
</style>
