<template>
  <div class="pt-16 pb-16">
    <select-city-component />
    <data-table-component :data-table="extraServices.key" v-if="dataI18n">
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
                  <v-col v-for="(item, index) in extraServiceList" :key="index" cols="12" md="4">
                    <v-sheet class="v-sheet--box">
                      <div class="d-flex justify-end">
                        <delete-card-component :card-data="'Удаление пункта'" @change="deleteCard(item, index)"/>
                      </div>
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
                    </v-sheet>
                  </v-col>
                  <v-col cols="12">
                    <add-new-card-component :card-data="0" @change="addCard(extraServices.list)"/>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="!!disableList.length">
            <v-card>
              <v-card-title>
                Отключенный список
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col v-for="(item, index) in disableList" :key="index" cols="12" md="4">
                    <v-sheet class="v-sheet--box" >
                      <div class="d-flex justify-end">
                        <add-disabled-card-component :card-data="'Add disabled block'" @change="plugCard(item.id)"/>
                      </div>
                      <v-textarea
                        rows="1"
                        label="Название блока"
                        v-model="item.title"
                        required
                        :rules="validateInputs.blockTitle"
                        counter
                        disabled
                      ></v-textarea>
                      <v-textarea
                        rows="2"
                        label="Описание блока"
                        v-model="item.des"
                        required
                        :rules="validateInputs.longerText"
                        counter
                        disabled
                      ></v-textarea>
                      <v-textarea
                        rows="1"
                        label="Ссылка"
                        v-model="item.path"
                        required
                        :rules="validateInputs.blockPath"
                        counter
                        disabled
                      ></v-textarea>
                    </v-sheet>
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
    SelectCityComponent, AgreeToEditComponent, AddNewCardComponent, DeleteCardComponent, DataTableComponent},
  data() {
    return {
      dialogEdit: false
    }
  },
  async fetch() {
    await this.GetI18n()
  },
  computed: {
    extraServices() {
      return this.dataI18n[this.$store.state.lang.selectLang].extraServicesList
    },
    extraServiceList() {
      return this.extraServices.list.filter(list => this.location?.extraServicesList.some(menu => menu === list.id))
    },
    disableList() {
      return this.extraServices.list.filter(list => !this.location?.extraServicesList.some(menu => menu === list.id))
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
    deleteCard(item, index) {
      if(!item.title) {
        this.arrDeleter(this.extraServices.list, index)
      }
      const location = this.location?.extraServicesList
      this.arrDeleter(location, index)
    },
    addCard(item) {
      let id = item[item.length -1].id
      const location = this.location?.extraServicesList
      this.arrAdder(location, ++id)
      let params = {
        id: id,
        path: "",
        title: "",
        des: ""
      }
      this.arrAdder(item, params)
    },
    plugCard(e) {
      const location = this.location?.extraServicesList
      this.arrAdder(location, e)
      return this.location?.extraServicesList.sort((a, b) => a - b)
    }
  }
}
</script>

<style scoped>

</style>
