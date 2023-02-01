<template>
  <div class="pt-16 pb-16">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-end">
          <v-btn to="/news/create">
            <v-icon>
              mdi-note-plus-outline
            </v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" v-for="(item, index) in testData" :key="index">
        <v-container>
          <v-card elevation="3">
            <div class="d-flex justify-end pt-2 pr-2">
              <v-icon
                @click="arrDeleter(testData, index)"
              >
                mdi-delete
              </v-icon>
            </div>
            <v-row>
              <v-col cols="12" lg="2" class="order-last order-lg-first">
                <v-card-title>
                  <v-avatar
                    color="grey"
                    size="128"
                    tile
                  >
                    <v-img :src="item.photo_url"></v-img>
                  </v-avatar>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    class="grey white--text"
                    :to="`/news/change-news/${item.id}`"
                  >
                    Редактировать
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col cols="12" lg="10">
                <v-card-text>
                  <div>
                    <p class="text-h6" v-html="item.title"></p>
                    <p v-html="item.description"></p>
                    <p class="body-1 font-weight-medium">{{item.company}}</p>
                    <p class="body-1">Активен c <span class="font-weight-bold">{{item.from}}</span> по <span class="font-weight-bold">{{item.to}}</span></p>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "news-component",
  data() {
    return {
      testData: [
        {
          id: 1,
          title: "Новый Алматы - город без окраин",
          description: "Lorem ipsum dolor sit amet",
          url: "",
          photo_url: "https://cms.meganet.kz/wp-content/uploads/2022/03/post__img-1.png",
          from: '2019-09-10',
          to: '2019-09-20',
          company: 'NlS'
        },
        {
          id: 2,
          title: "Встреча жителей микрорайона Нұршашқан с представителями sfsafsafsafsafsafsadsadsadasdas",
          description: "Lorem ipsum dolor sit amet",
          url: "",
          photo_url: "https://cms.meganet.kz/wp-content/uploads/2022/03/post__img-2.png",
          from: '2019-09-10',
          to: '2019-09-20',
          company: 'MEGANET'
        },
        {
          id: 3,
          title: "30 қыркүйектегі техникалық жұмыстар. Технические работы 30 сентября",
          description: "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet",
          url: "",
          photo_url: "https://cms.meganet.kz/wp-content/uploads/2022/09/Frame-100.png",
          from: '2019-09-10',
          to: '2019-09-20',
          company: 'Cabinet MEGANET'
        },
      ]
    }
  },

}
</script>

<style scoped>

</style>
