<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="itService.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <v-textarea
              rows="1"
              label="Заголовок"
              v-model="itService.title"
              required
              :rules="validateInputs.blockTitle"
              counter
            ></v-textarea>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="(item, index) in itService.cards" :key="index" cols="12" lg="4">
                <v-sheet class="v-sheet--box" >
                  <div class="d-flex justify-end">
                    <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(itService.cards, index)"/>
                  </div>
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
                    v-model="item.des"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <add-new-card-component :card-data="0" @change="addCard(itService.cards)"/>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-row>
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
          </v-card-actions>
        </v-card>
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
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";

export default {
  name: "it-out-services-component",
  components: {AddNewCardComponent, DeleteCardComponent, AgreeToEditComponent, DataTableComponent},
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
    itService() {
      return this.dataI18n[this.$store.state.lang.selectLang].itServices
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
    addCard(item) {
      let params = {
        title: '',
        des: ''
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
