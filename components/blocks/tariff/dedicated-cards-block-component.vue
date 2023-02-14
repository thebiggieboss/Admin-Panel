<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="dedicatedCard.title">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col v-for="(item, index) in dedicatedCard.tab[1].cards" :key="index" cols="12" lg="3">
            <v-card>
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="deleteBlock(dedicatedCard.tab[1].cards, index)"/>
              </div>
              <v-card-title>
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="item.title"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
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
                  label="Описание"
                  v-model="item.des"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
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
            <add-new-card-component :card-data="0" @change="addBlock(dedicatedCard.tab[1].cards)"/>
          </v-col>
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
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import DataTableComponent from "@/components/tables/data-table-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";

export default {
  name: "dedicated-cards-block-component",
  components: {AddNewCardComponent, DataTableComponent, AgreeToEditComponent, DeleteCardComponent},
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
    dedicatedCard() {
      return this.dataProps[this.$store.state.lang.selectLang].serverRental
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
    deleteBlock(item, index) {
      if(item.length <= 1) {
        this.$toast.open({
          message: "Нельзя удалить",
          type: "warning",
        });
        return
      }
      this.arrDeleter(item, index)
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
        des: "",
        icon: "/icons/cloud-infrastructure/price-icon.svg",
        price: "",
        subPrice: "",
        title: "",
        value:"Заказать"

      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
