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
                v-model="dedicatedCalc.title"
                required
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Описание"
                v-model="dedicatedCalc.des"
                required
                counter
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-title>
        <period-calc-card-component :card-data="dedicatedCalc.period"/>
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
          <v-row>
            <v-col cols="6" v-for="(item, index) in dedicatedCalc.checkBoxes" :key="index">
              <v-sheet class="v-sheet--box">
                <v-textarea
                  rows="1"
                  label="Название"
                  v-model="item.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="item.des"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Значение"
                  v-model="item.value"
                  required
                  counter
                  hide-details
                ></v-textarea>
                <v-checkbox
                  v-model="item.active"
                  :label="item.active.toString()"
                ></v-checkbox>
              </v-sheet>
            </v-col>
            <v-col cols="12">
              <v-sheet class="v-sheet--box">
                <v-textarea
                  rows="1"
                  label="Кнопка"
                  v-model="dedicatedCalc.addSlot.title"
                  required
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Текст"
                  v-model="dedicatedCalc.addSlot.des"
                  required
                  counter
                ></v-textarea>
              </v-sheet>
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
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataProps"
    />
  </div>
</template>

<script>
import ServerSystemsCardsComponent from "@/components/cards/calculators/server-systems-cards-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import PeriodCalcCardComponent from "@/components/cards/calculators/period-calc-card-component.vue";

export default {
  name: "dedicated-calc-component",
  components: {PeriodCalcCardComponent, AgreeToEditComponent, ServerSystemsCardsComponent },
  props: {
    dataProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tabIndex: null,
      dialogEdit: false
    };
  },
  computed: {
    dedicatedCalc() {
      return this.dataProps[this.$store.state.lang.selectLang].serverRental.tab[0].cards;
    },
    tabs() {
      return [
        {
          title: this.dedicatedCalc.cpu.title,
          content: this.dedicatedCalc.cpu.content,
        },
        {
          title: this.dedicatedCalc.ramContent.title,
          content: this.dedicatedCalc.ramContent.content,
        },
        {
          title: this.dedicatedCalc.storageContent.title,
          content: this.dedicatedCalc.storageContent.content,
        },
        {
          title: this.dedicatedCalc.ipAddress.title,
          content: this.dedicatedCalc.ipAddress.content,
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
};
</script>

<style scoped lang="scss"></style>
