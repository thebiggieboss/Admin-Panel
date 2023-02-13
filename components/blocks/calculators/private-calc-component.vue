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
                  v-model="privateCalc.cards.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="privateCalc.cards.des"
                  required
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <calculator-cards-component :card-data="privateCalc.cards.form"/>
            <div>
              <v-textarea
                rows="1"
                label="Price title"
                v-model="privateCalc.cards.calculateTitle"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="From price"
                v-model="privateCalc.cards.fromPrice"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Sub price"
                v-model="privateCalc.cards.subPrice"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="НДС"
                v-model="privateCalc.cards.vatDes"
                required
                counter
              ></v-textarea>
            </div>
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
      :main-data="dataProps"
    />
  </div>
</template>

<script>

import CalculatorCardsComponent from "@/components/cards/calculators/calculator-cards-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "private-calc-component",
  components: {AgreeToEditComponent, CalculatorCardsComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogEdit: false
    }
  },
  computed: {
    privateCalc() {
      return this.dataProps[this.$store.state.lang.selectLang].privateCloud
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
