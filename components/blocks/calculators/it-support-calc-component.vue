<template>
  <div class="pb-16 pt-16">
    <v-container class="it-support-calc-component">
      <v-form @submit.prevent="submit" ref="form">
        <v-card>
          <v-card-text>
            <it-support-card-component :card-data="itCalc"/>
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
import ItSupportCardComponent from "@/components/cards/calculators/it-support-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "it-support-calc-component",
  components: {AgreeToEditComponent, ItSupportCardComponent},
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
    itCalc() {
      return this.dataProps[this.$store.state.lang.selectLang].itSupportCalculate.form
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

<style scoped lang="scss">
.it-support-calc-component {

}
</style>
