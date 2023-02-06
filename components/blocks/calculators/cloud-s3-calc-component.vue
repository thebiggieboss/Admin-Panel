<template>
  <div class="pb-16 pt-16">
    <v-container>
      <v-form @submit.prevent="submit" ref="form">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="cloudS3Calc.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="cloudS3Calc.des"
                  required
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-sheet class="v-sheet--box">
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="cloudS3Calc.manualAddition.title"
                    required
                    counter
                    hide-details
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    rows="1"
                    label="Value"
                    v-model="cloudS3Calc.manualAddition.count"
                    required
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Единица измерения"
                    v-model="cloudS3Calc.manualAddition.des"
                    required
                    counter
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    rows="1"
                    label="Цена"
                    v-model="cloudS3Calc.manualAddition.monthPrice"
                    required
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Константа"
                    v-model="cloudS3Calc.manualAddition.value"
                    required
                    counter
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-sheet>
            <v-row>
              <v-col v-for="(item, index) in cloudS3Calc.tabs" :key="index" cols="4">
                <v-sheet class="v-sheet--box">
                  <v-textarea
                    rows="1"
                    label="Кнопка"
                    v-model="item.text"
                    required
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Цена"
                    v-model="item.value"
                    required
                    counter
                  ></v-textarea>
                </v-sheet>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  rows="1"
                  label="Price title"
                  v-model="cloudS3Calc.fromPrice"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="НДС"
                  v-model="cloudS3Calc.vatDes"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Sub price"
                  v-model="cloudS3Calc.subPrice"
                  required
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <div class="d-flex align-center" style="gap: 32px">
              <v-btn type="submit">
                Сохранить
              </v-btn>
              <v-btn @click="GetI18n">
                Вернуть данные
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataI18n"
    />
  </div>
</template>

<script>
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "cloud-s3-calc-component",
  components: {AgreeToEditComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dataI18n: this.dataProps,
      dialogEdit: false
    }
  },
  computed: {
    cloudS3Calc() {
      return this.dataI18n[this.$store.state.lang.selectLang].objectStorage.cards
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return;
      }
      this.dialogEdit = true;
    }
  }
}
</script>

<style scoped>

</style>
