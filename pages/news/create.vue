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
                  rows="3"
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
                      :label="el"
                      hide-details
                      :value="el"
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

export default {
  name: "create",
  components: {TiptapEditor},
  data() {
    return {
      datePicker: false,
      checkGroup: ['NLS.KZ', 'MEGANET'],
      storeNews: {
        title: '',
        description: '',
        photo_url: '',
        dates: ['', ''],
        check: [],
        content: '',
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
    submit() {
      if (!this.$refs.form.validate() || !this.validateTipTap) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return;
      }
      let id = 3
      let params =  {
        id: ++id,
        title: this.storeNews.title,
        description: this.storeNews.description,
        url: "",
        photo_url: this.storeNews.photo_url,
        from: this.storeNews.dates[0],
        to: this.storeNews.dates[1],
        content: this.storeNews.content
      }
      console.log(params)
    }
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
