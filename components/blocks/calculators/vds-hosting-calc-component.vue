<template>
  <div class="pb-16 pt-16">
    <v-container>
      <v-form @submit.prevent="submit" ref="form">
        <v-card>
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="6">
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="vdsCalc.title"
                    required
                    counter
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="vdsCalc.des"
                    required
                    counter
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-sheet class="v-sheet--box" v-for="(item, index) in vdsCalc.form" :key="index">
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="item.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Цена"
                  v-model="item.monthPrice"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Счетчик начинается с"
                  v-model="item.value"
                  required
                  counter
                ></v-textarea>
              </v-sheet>
              <v-textarea
                rows="1"
                label="Price text"
                v-model="vdsCalc.fromPrice"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Price text"
                v-model="vdsCalc.vatDes"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Price text"
                v-model="vdsCalc.subPrice"
                required
                counter
              ></v-textarea>
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
  name: "vds-hosting-calc-component",
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
    vdsCalc() {
      return this.dataI18n[this.$store.state.lang.selectLang].virtualConfigurator
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
