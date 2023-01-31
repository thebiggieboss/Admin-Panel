<template>
  <div class="pt-16 pb-16">
    <select-city-component :city-list="dataI18n" />
    <data-table-component :data-table="extraServices.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="extraServices.title"
                  required
                  :rules="validateInputs.blockTitle"
                  counter
                ></v-textarea>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="(item, index) in extraServiceList"
                    :key="index"
                    cols="12"
                    md="4"
                  >
                    <v-sheet class="v-sheet--box">
                      <v-row class="mb-2">
                        <v-col cols="12">
                          <delete-card-component
                            :card-data="'Удалить'"
                            @change="deleteCard(item.id, index)"
                          />
                          <v-tooltip top v-if="!item.show">
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                v-bind="attrs"
                                v-on="on"
                                @click="hideCard(item.id)"
                              >
                                mdi-eye-off
                              </v-icon>
                            </template>
                            <span>Скрыть</span>
                          </v-tooltip>
                          <add-disabled-card-component v-if="item.show" :card-data="'Показать'" @change="showCard(item.id)"/>
                        </v-col>
                      </v-row>
                      <v-card elevation="0" :disabled="item.show">
                        <v-textarea
                          rows="1"
                          label="Название блока"
                          v-model="item.title"
                          required
                          :rules="validateInputs.blockTitle"
                          counter
                        ></v-textarea>
                        <v-textarea
                          rows="2"
                          label="Описание блока"
                          v-model="item.des"
                          required
                          :rules="validateInputs.longerText"
                          counter
                        ></v-textarea>
                        <v-textarea
                          rows="1"
                          label="Ссылка"
                          v-model="item.path"
                          required
                          :rules="validateInputs.blockPath"
                          counter
                        ></v-textarea>
                      </v-card>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12">
                    <add-new-card-component
                      :card-data="0"
                      @change="addCard(extraServices.list)"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card-actions>
              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center" style="gap: 32px">
                    <v-btn type="submit"> Сохранить </v-btn>
                    <v-btn @click="GetI18n"> Вернуть данные </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-actions>
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
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import SelectCityComponent from "@/components/blocks/select-city-component.vue";
import AddDisabledCardComponent from "@/components/cards/add-disabled-card-component.vue";

export default {
  name: "extra-services-component",
  components: {
    AddDisabledCardComponent,
    SelectCityComponent,
    AgreeToEditComponent,
    AddNewCardComponent,
    DeleteCardComponent,
    DataTableComponent,
  },
  props: {
    dataProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogEdit: false,
      dataI18n: this.dataProps,
    };
  },
  computed: {
    location() {
      let city = this.dataI18n[this.$store.state.lang.selectLang].selectCity.list;
      return city.find((item) => item.id === this.$store.state.lang.location);
    },
    extraServices() {
      return this.dataI18n[this.$store.state.lang.selectLang].extraServicesList
    },
    extraServiceList() {
      return this.extraServices.list.map(item => {
        return {
          ...item,
          show: !this.location.extraServicesList.some((menu) => menu === item.id)
        }
      })
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
    deleteCard(id, index) {
      this.arrDeleter(this.extraServices.list, index)
      this.hideCard(id)
    },
    addCard(item) {
      let id = item[item.length -1].id
      let params = {
        id: ++id,
        path: "",
        title: "",
        des: ""
      }
      this.arrAdder(item, params)
      this.showCard(id)
    },
    showCard(id) {
      this.arrAdder(this.location.extraServicesList, id)
      this.location.extraServicesList.sort((a, b) => a - b)
    },
    hideCard(id) {
      this.arrDeleter(this.location.extraServicesList, this.location.extraServicesList.indexOf(id))
    }
  },
};
</script>

<style scoped></style>
