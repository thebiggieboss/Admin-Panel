<template>
  <div class="pt-16 pb-16">
    <data-table-component :data-table="hostingCard.title">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col v-for="(item, index) in hostingCard.cards" :key="index" cols="12" lg="3">
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex justify-end">
                      <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(hostingCard.cards, index)"/>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-textarea
                      rows="1"
                      label="Заголовок"
                      v-model="item.title"
                      required
                      :rules="validateInputs.text"
                      counter
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-textarea
                      rows="1"
                      label="Тариф"
                      v-model="item.subtitle"
                      required
                      :rules="validateInputs.text"
                      counter
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-sheet class="v-sheet--box" v-for="(list, listIndex) in item.contents" :key="listIndex">
                  <div class="d-flex justify-end">
                    <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(item.contents, listIndex)"/>
                  </div>
                  <v-textarea
                    rows="1"
                    label="Количество"
                    v-model="list.count"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="list.des"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                </v-sheet>
                <add-new-card-component :card-data="0" @change="addCard(item.contents)"/>
              </v-card-text>
              <v-card-text>
                <v-textarea
                  rows="1"
                  label="price"
                  v-model="item.price"
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
                <v-textarea
                  rows="1"
                  label="price"
                  v-model="item.subPrice"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <add-new-card-component :card-data="1" @change="addBlock(hostingCard.cards)"/>
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
  name: "hosting-cards-block-component",
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
    hostingCard() {
      return this.dataProps[this.$store.state.lang.selectLang].hostingServices
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
        count: '',
        des: ''
      }
      this.arrAdder(item, params)
    },
    addBlock(item) {
      let params = {
        contents: [
          {
            count: '',
            des: ''
          }
        ],
        icon:"/icons/cloud-infrastructure/price-icon.svg",
        price: "",
        subButton: "",
        subPrice: "",
        subtitle: "",
        title: "",
        value:"Выбрать",

      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
