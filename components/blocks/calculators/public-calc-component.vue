<template>
  <div class="pb-16 pt-16">
    <v-form @submit.prevent="submit" ref="form">
      <v-card>
        <v-row class="px-4">
          <v-col cols="12">
            <v-textarea
              rows="1"
              label="Заголовок"
              v-model="publicCalc.cards.title"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Описание"
              v-model="publicCalc.cards.des"
              required
              counter
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <calculator-cards-component :card-data="publicCalc.cards.form"/>
            <v-textarea
              rows="1"
              label="Button"
              v-model="publicCalc.cards.addMore"
              required
              counter
              style="width: 200px"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              rows="1"
              label="Заголовок"
              v-model="publicCalc.cards.edge.title"
              required
              counter
            ></v-textarea>
            <calculator-cards-component :card-data="publicCalc.cards.edge.form"/>
          </v-col>
          <v-col cols="6">
            <v-textarea
              rows="1"
              label="Price title"
              v-model="publicCalc.cards.calculateTitle"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="From price"
              v-model="publicCalc.cards.fromPrice"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Sub price"
              v-model="publicCalc.cards.subPrice"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="НДС"
              v-model="publicCalc.cards.vatDes"
              required
              counter
            ></v-textarea>
          </v-col>
        </v-row>
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
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataProps"
    />
  </div>
</template>

<script>
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import CalculatorCardsComponent from "@/components/cards/calculators/calculator-cards-component.vue";

export default {
  name: "public-calc-component",
  components: {CalculatorCardsComponent, AgreeToEditComponent},
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
    publicCalc() {
      return this.dataProps[this.$store.state.lang.selectLang].publicCloud
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
