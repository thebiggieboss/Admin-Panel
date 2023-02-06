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
                  v-model="cloudCalc.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="cloudCalc.des"
                  required
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="cloudCalc.formTitle"
                  required
                  counter
                  hide-details
                ></v-textarea>
              </v-col>
              <v-col v-for="(item, index) in cloudCalc.form" :key="index" cols="4">
                <v-sheet class="v-sheet--box">
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="item.tab"
                    required
                    counter
                  ></v-textarea>
                  <v-row>
                    <v-col v-for="el in item.prices" :key="el.title">
                      <v-textarea
                        rows="1"
                        :label="el.title"
                        v-model="el.price"
                        required
                        counter
                        hide-details
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  rows="1"
                  label="НДС"
                  v-model="cloudCalc.vatDes"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Sub price"
                  v-model="cloudCalc.subPrice"
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
  name: "cloud-calc-component",
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
    cloudCalc() {
      return this.dataI18n[this.$store.state.lang.selectLang].cloudStorage.cards
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
