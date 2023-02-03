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
                  v-model="storeNews.title"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-textarea
                  rows="2"
                  label="Описание"
                  v-model="storeNews.description"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-textarea
                  rows="1"
                  label="Ссылка на картинку"
                  v-model="storeNews.photo_url"
                  :rules="validateInputs.longerText"
                  required
                  counter
                >
                </v-textarea>
                <v-textarea
                  rows="1"
                  label="URL"
                  v-model="storeNews.url"
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
                       (v) => !!v.length,
                       (v) => (v || '' ).length > 1
                      ]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="storeNews.dates"
                    range
                  ></v-date-picker>
                </v-menu>
                <div class="mt-2">
                  <p class="text-body-1 black--text">Компания:</p>
                  <div v-for="(el) in checkGroup">
                    <v-checkbox
                      v-model="storeNews.check"
                      :label="el.name"
                      hide-details
                      :value="el.id"
                      color="blue"
                      :rules="[(v) => !!v.length]"
                    ></v-checkbox>
                  </div>
                </div>
              </v-card-text>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card-text>
                <client-only>
                  <tiptap-editor v-model="storeNews.content"/>
                </client-only>
                <div class="mt-4">
                  <h3 class="pb-1">Content</h3>
                  <p class="store-news__content" v-html="storeNews.content"></p>
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
import {CreateNews, GetAllCompany} from "@/service/user";

export default {
  name: "create-news-component",
  components: {TiptapEditor},
  data() {
    return {
      datePicker: false,
      checkGroup: [],
      storeNews: {
        title: '',
        description: '',
        photo_url: '',
        dates: ['', ''],
        check: [],
        content: '',
        url: ''
      }
    }
  },
  computed: {
    dateRangeText () {
      return this.storeNews.dates.sort((a, b) => new Date(a) - new Date(b))
    },
    validateTipTap() {
      return this.storeNews.content.length > 7
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
      let params =  {
        title: this.storeNews.title,
        description: this.storeNews.description,
        url: this.storeNews.url,
        // photo_url: this.storeNews.photo_url,
        active_from: this.storeNews.dates[0],
        active_to: this.storeNews.dates[1],
        content: this.storeNews.content,
        company: this.storeNews.check
      }
      try {
        const res = await CreateNews(params)
        this.$toast.open({
          message: res.message,
          type: res.success ? "success" : "warning"
        })
        await this.$router.push('/news');
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
    await this.getAllCompany()
  }
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
