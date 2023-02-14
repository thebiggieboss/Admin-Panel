<template>
  <div class="pt-16 pb-16">
    <data-table-component :data-table="chooseUs.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-card class="mx-auto">
          <v-card-title>
            <v-textarea
              rows="1"
              label="Заголовок"
              v-model="chooseUs.title"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
          </v-card-title>
          <v-card-text>
            <v-sheet class="v-sheet--box" v-for="(item, index) in chooseUs.cards" :key="index">
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(chooseUs.cards, index)"/>
              </div>
              <v-textarea
                rows="1"
                label="Заголовок"
                v-model="item.title"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Описание"
                v-model="item.des"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
              <v-textarea
                rows="1"
                label="Иконка"
                v-model="item.icon"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
            </v-sheet>
            <add-new-card-component :card-data="0" @change="addCard(chooseUs.cards)"/>
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
  name: "choose-us-component",
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
    };
  },
  computed: {
    chooseUs() {
      return this.dataProps[this.$store.state.lang.selectLang].whyChooseUs;
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
    addCard(item) {
      let params = {
        des: '',
        icon: '',
        title: ''
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
