<template>
  <div class="pb-16 pt-16">
    <v-container>
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-row>
            <v-col cols="12" lg="6">
              <v-card-text>
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="newsData.title"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-textarea
                  rows="2"
                  label="Описание"
                  v-model="newsData.description"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-textarea
                  rows="1"
                  label="Ссылка на картинку"
                  v-model="newsData.main_image"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-textarea
                  rows="1"
                  label="URL"
                  v-model="newsData.url"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-menu
                  v-model="datePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRangeText"
                      label="Date range"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[
                       (v) => !!v,
                       (v) => (v || '' ).length > 1
                      ]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newsData.dates"
                    range
                  ></v-date-picker>
                </v-menu>
                <div class="mt-2">
                  <p class="text-body-1 black--text">Компания:</p>
                  <div v-for="(el) in checkGroup">
                    <v-checkbox
                      v-model="newsData.company"
                      :label="el.name"
                      hide-details
                      :value="el.name"
                      color="blue"
                      :rules="[(v) => !!v.length]"
                    ></v-checkbox>
                  </div>
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card-text v-if="newsData.content">
                <client-only>
                  <tiptap-editor v-model="newsData.content"/>
                </client-only>
                <div class="mt-4">
                  <h3 class="pb-1">Content</h3>
                  <p class="store-news__content" v-html="newsData.content"></p>
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="12">
              <v-card-actions>
                <v-btn color="grey" class="white--text" type="submit">
                  Сохранить
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import TiptapEditor from "@/components/elements/tiptap-editor.vue";
import {GetAllCompany, GetUrlNews, UpdateNews} from "@/service/user";
import axios from "axios";
import {StringToDate,} from "@/modules/dateFormat";

export default {
  name: "change-news-component",
  components: {TiptapEditor},
  data() {
    return {
      newsData: [],
      datePicker: false,
      checkGroup: []
    }
  },
  computed: {
    dateRangeText () {
      return this.newsData?.dates?.sort((a, b) => new Date(a) - new Date(b))
    },
    validateTipTap() {
      return this.newsData.content.length > 7
    }
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate() || !this.validateTipTap) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return;
      }
      let data = {
        title: this.newsData.title,
        description: this.newsData.description,
        url: this.newsData.url,
        content: this.newsData.content,
        company: this.newsData.title.company,
        active_from: this.newsData.dates[0],
        active_to: this.newsData.dates[1],
        main_image: this.newsData.main_image
      }
      try {
        const res = await UpdateNews(this.newsData.id, data)
        this.$toast.open({
          message: res.message,
          type: res.success ? "success" : "warning"
        })
        await this.$router.push('/news')
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    },
    async getUrlNews() {
      try {
        const data = await GetUrlNews(this.$route.params.url)
        this.newsData = {
          ...data.data,
          dates: [StringToDate(data.data.active_from), StringToDate(data.data.active_to)],
          company: data.data.company_news.map(item => item.company.name)
        }
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    },
    async getAllCompany() {
      try {
        const data = await GetAllCompany()
        this.checkGroup = data
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    }
  },
  async mounted() {
    await this.getUrlNews()
    await this.getAllCompany()
  },
}
</script>

<style scoped lang="scss">
.store-news__textarea {
  max-width: 400px;
}
.store-news__content {
  padding: 12px 24px;
  border: 1px solid black;
}
</style>
