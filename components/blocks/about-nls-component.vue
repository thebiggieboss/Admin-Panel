<template>
  <div class="pt-16 pb-16">
    <data-table-component :data-table="aboutComp.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-card class="mx-auto">
          <v-card-title>
            <v-row>
              <v-col cols="12" md="6">
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="aboutComp.title"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
                <v-textarea
                  rows="3"
                  label="Подзаголовок"
                  v-model="aboutComp.subTitle"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea
                  rows="1"
                  label="Главный титул"
                  v-model="aboutComp.head"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
                <v-textarea
                  rows="3"
                  label="Описание"
                  v-model="aboutComp.des"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-textarea
              rows="1"
              label="Название списка"
              v-model="aboutComp.list.title"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <v-row>
              <v-col cols="12" v-for="(item, index) in aboutComp.list.cards" :key="index" lg="4" md="6">
                <v-sheet class="v-sheet--box" >
                  <div class="d-flex justify-end">
                    <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(aboutComp.list.cards, index)"/>
                  </div>
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="item.description"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                  <image-dialog-component v-model="item.icon"/>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <add-new-card-component :card-data="0" @change="addCard(aboutComp.list.cards)"/>
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
import ImageDialogComponent from "@/components/dialogs/image-dialog-component.vue";

export default {
  name: "about-nls-component",
  components: {ImageDialogComponent, AgreeToEditComponent, AddNewCardComponent, DeleteCardComponent, DataTableComponent},
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
    aboutComp() {
      return this.dataProps[this.$store.state.lang.selectLang].aboutUsNls
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
        icon : '',
        description: ''
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
