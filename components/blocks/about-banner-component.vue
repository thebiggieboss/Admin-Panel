<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="aboutBanner.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-card class="mx-auto">
          <v-card-title>
            <v-row>
              <v-col cols="12" sm="6">
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="aboutBanner.title"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="aboutBanner.subTitle"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-sheet class="v-sheet--box" v-for="(item, index) in aboutBanner.list" :key="index">
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(aboutBanner.list, index)"/>
              </div>
              <v-textarea
                rows="1"
                label="Список"
                v-model="aboutBanner.list[index]"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
            </v-sheet>
            <add-new-card-component :card-data="0" @change="arrAdder(aboutBanner.list, '')"/>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center" style="gap: 32px">
                  <v-btn type="submit">
                    Сохранить
                  </v-btn>
                  <v-btn @click="$nuxt.$emit('refreshPage')">
                    Вернуть данные
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-form>
    </data-table-component>
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataProps"
    />
  </div>
</template>

<script>
import DataTableComponent from "@/components/tables/data-table-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "about-banner-component",
  components: {AgreeToEditComponent, AddNewCardComponent, DeleteCardComponent, DataTableComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogEdit: false,
    }
  },
  computed: {
    aboutBanner() {
      return this.dataProps[this.$store.state.lang.selectLang].aboutUsNlsKz
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
    },
  }
}
</script>

<style scoped>

</style>
