<template>
  <div class="pb-16 pt-16">
    <v-form @submit.prevent="submit" ref="form">
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>АРЕНДА СЕРВЕРОВ</v-toolbar-title>
        </v-toolbar>
        <v-card-title>
          <v-row>
            <v-col cols="12">
              <v-textarea
                rows="1"
                label="Заголовок"
                v-model="colocationCalc.title"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Описание"
                v-model="colocationCalc.des"
                required
                counter
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-title>
        <period-calc-card-component :card-data="colocationCalc.period"/>
        <v-tabs vertical v-model="tabIndex">
          <v-tab v-for="(item, index) in tabs" :key="index">
            {{ item.title }}
          </v-tab>
          <v-tabs-items v-model="tabIndex">
            <v-tab-item v-for="(item, index) in tabs" :key="index">
              <v-card flat>
                <v-card-text>
                  <server-systems-cards-component :card-data="item" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
        <v-card-text>
          <v-sheet class="v-sheet--box">
            <v-row>
              <v-col cols="6">
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="colocationCalc.sale.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="colocationCalc.sale.des"
                  required
                  counter
                ></v-textarea>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  rows="1"
                  label="Под описание"
                  v-model="colocationCalc.sale.subDes"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Скидка"
                  v-model="colocationCalc.sale.discount"
                  required
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet class="v-sheet--box">
            <v-textarea
              rows="1"
              label="Скидка"
              v-model="colocationCalc.economy.sale"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Скидка"
              v-model="colocationCalc.economy.saleForSizMonth"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Скидка"
              v-model="colocationCalc.economy.saleForYear"
              required
              counter
            ></v-textarea>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <div class="d-flex align-center" style="gap: 32px">
            <v-btn type="submit">
              Сохранить
            </v-btn>
            <v-btn @click="$nuxt.$emit('refreshPage')">
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
import ServerSystemsCardsComponent from "@/components/cards/calculators/server-systems-cards-component.vue";
import PeriodCalcCardComponent from "@/components/cards/calculators/period-calc-card-component.vue";

export default {
  name: "colocation-calc-component",
  components: {PeriodCalcCardComponent, ServerSystemsCardsComponent, AgreeToEditComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tabIndex: null,
      dialogEdit: false
    }
  },
  computed: {
    colocationCalc() {
      return this.dataProps[this.$store.state.lang.selectLang].dataCenter.cards
    },
    tabs() {
      return [
        {
          title: this.colocationCalc.unit.title,
          content: this.colocationCalc.unit.content,
        },
        {
          title: this.colocationCalc.powerUnit.title,
          content: this.colocationCalc.powerUnit.content,
        },
        {
          title: this.colocationCalc.ports.title,
          content: this.colocationCalc.ports.content,
        },
        {
          title: this.colocationCalc.ipAddress.title,
          content: this.colocationCalc.ipAddress.content,
        },
      ];
    },
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
    },
  }
}
</script>

<style scoped>

</style>
