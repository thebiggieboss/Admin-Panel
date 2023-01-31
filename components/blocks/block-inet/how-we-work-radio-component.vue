<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="howWorkRadio.title">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="4" v-for="(item, index) in howWorkRadio.list" :key="index">
            <v-card>
              <v-sheet class="v-sheet--box">
                <v-card-text>
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="item.title"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="item.description"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Иконка"
                    v-model="item.icon"
                    required
                    :rules="validateInputs.blockIcon"
                    counter
                  ></v-textarea>
                </v-card-text>
              </v-sheet>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center" style="gap: 32px">
              <v-btn type="submit">
                Сохранить
              </v-btn>
              <v-btn @click="GetI18n">
                Вернуть данные
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </data-table-component>
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataI18n"
    />
  </div>
</template>

<script>
import DataTableComponent from "@/components/tables/data-table-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "how-we-work-radio-component",
  components: {AgreeToEditComponent, DataTableComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogEdit: false,
      dataI18n: this.dataProps
    };
  },
  computed: {
    howWorkRadio() {
      return this.dataI18n[this.$store.state.lang.selectLang].howWeWorkRadio
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
