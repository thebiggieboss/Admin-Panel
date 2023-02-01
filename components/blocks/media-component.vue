<template>
  <div class="pb-16 pt-16">
    <v-container>
      <v-card>
        <v-tabs
          v-model="tab"
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
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(item, index) in obj"
            :key="index"
          >
            <media-card-component :card-data="item"/>
          </v-tab-item>
        </v-tabs-items>
        <v-card-title>
          <div class="media-component__input">
            <v-file-input
              v-model="image"
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp"
              @change="selectImage"
              @click:clear="clearImagePreview()"
              label="Выбрать файл"
            ></v-file-input>
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
            @click="saveImg"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import MediaCardComponent from "@/components/cards/media-card-component.vue";

export default {
  name: "media-component",
  components: {MediaCardComponent},
  data () {
    return {
      tab: null,
      image: [],
      imagePreview: "",
      tabs: ['Images', 'Icons', 'News'],
      obj: {
        images: [
          {
            path: '/icon/arman.svg',
            id: 1,
            src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          },
          {
            path: '',
            id: 2,
            src: 'https://www.istockphoto.com/resources/images/PhotoFTLP/P4-JAN-iStock-1432854572.jpg',
          },
          {
            path: '',
            id: 3,
            src: 'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
          },
          {
            path: '',
            id: 3,
            src: 'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
          },
          {
            path: '',
            id: 3,
            src: 'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
          }
        ],
        icons: [
          {
            path: '',
            id: 1,
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Circle-icons-gamecontroller.svg/2048px-Circle-icons-gamecontroller.svg.png',
          }
        ],
        news: [
          {
            path: '',
            id: 1,
            src: 'https://cms.meganet.kz/wp-content/uploads/2022/03/post__img-1.png',
          },
          {
            path: '',
            id: 2,
            src: 'https://cms.meganet.kz/wp-content/uploads/2022/03/post__img-2.png',
          },
        ]
      }
    }
  },
  methods: {
    saveImg() {

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
  }
}
</script>

<style scoped lang="scss">
.media-component__input {
  width: 100%;
  max-width: 500px;
}
</style>
