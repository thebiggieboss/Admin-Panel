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
      <v-col cols="12" v-for="(item, index) in newsData.data" :key="index">
        <v-container>
          <v-card elevation="3">
            <div class="d-flex justify-end pt-2 pr-2">
              <v-icon
                @click="deleteNews(item.id)"
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
                    <v-img :src="item.main_image"></v-img>
                  </v-avatar>
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    class="grey white--text"
                    :to="`/news/change-news/${item.url}`"
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
                    <p class="body-1 font-weight-medium"><span class="pl-0 pr-2" v-for="comp in item.company_news" :key="comp.id">{{comp.company.name}}</span></p>
                    <p class="body-1">Активен c <span class="font-weight-bold">{{item.active_from}}</span> по <span class="font-weight-bold">{{item.active_to}}</span></p>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="newsData['total-page']"
            :total-visible="7"
            @input="pagination"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {DeleteNews, GetAllNews} from "@/service/user";

export default {
  name: "news-component",
  data() {
    return {
      page: 1,
      newsData: {}
    }
  },
  methods: {
    async pagination(page) {
      await this.getAllNews(page)
    },
    async getAllNews(page) {
      try {
        const data = await GetAllNews(page)
        this.newsData = {
          data: data.data,
          ["total-page"]: data.last_page
        }
      } catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error",
        })
      }
    },
    async deleteNews(id) {
      try {
        const res = await DeleteNews(id)
        this.$toast.open({
          message: res.message,
          type: res.success ? "success" : "warning",
        })
        await this.getAllNews(this.page)
      } catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error",
        })
      }
    }
  },
  async mounted() {
    await this.getAllNews(this.page)
  }
}
</script>

<style scoped>

</style>
