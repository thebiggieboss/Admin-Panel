<template>
  <div class="pt-16 pb-16">
    <v-form ref="form" @submit.prevent="submit">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="primary"
          dark
          centered
          grow
        >
          <v-tab
            v-for="(item, itemIndex) in virtualCard.tabs"
            :key="itemIndex"
          >
            <div class="d-flex justify-space-between align-center">
              <div>
                {{ item.title }}
              </div>
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="removeTab(virtualCard.tabs, itemIndex)"/>
              </div>
            </div>
          </v-tab>
          <div class="d-flex align-center px-2">
            <add-new-block-card-component :card-data="'Добавление нового города'" @change="addTab(virtualCard.tabs)"/>
          </div>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(items, itemsIndex) in virtualCard.tabs"
            :key="itemsIndex"
            class="pa-4"
          >
            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="Месяц"
                  style="width: 300px"
                  rows="1"
                  v-model="items.title"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-col>
              <v-col cols="12" lg="3" v-for="(el, elIndex) in items.cards" :key="elIndex">
                <vds-hosting-card-component :card-data="el">
                  <div class="d-flex justify-end">
                    <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(items.cards, elIndex)"/>
                  </div>
                </vds-hosting-card-component>
              </v-col>
              <v-col cols="12">
                <add-new-card-component :card-data="1" @change="addBlock(items.cards)"/>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
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
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataProps"
    />
  </div>
</template>

<script>
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewBlockCardComponent from "@/components/cards/add-new-block-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import VdsHostingCardComponent from "@/components/cards/vds-hosting-card-component.vue";

export default {
  name: "vds-hosting-cards-block-component",
  components: {
    VdsHostingCardComponent,
    AddNewCardComponent, AddNewBlockCardComponent, DeleteCardComponent, AgreeToEditComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tab: null,
      dialogEdit: false,
    };
  },
  computed: {
    virtualCard() {
      return this.dataProps[this.$store.state.lang.selectLang].virtualServers
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
    removeTab(item, index) {
      if(item.length <= 1) {
        this.$toast.open({
          message: "Нельзя удалить",
          type: "warning",
        });
        return
      }
      this.arrDeleter(item, index)
    },
    addTab(item) {
      let params = {
        title: '',
        cards: [
          {
            contents: [
              {
                count: "",
                des: ""
              }
            ],
            economy: "",
            head: "",
            icon: "",
            path: "",
            price: "",
            subButton:"",
            subPath: "",
            subPrice: "",
            subTitle: "",
            title: "",
            value: "Выбрать",
          }
        ]
      }
      this.arrAdder(item, params)
      let arr = this.virtualCard.tabs
      this.tab = arr.indexOf(arr[arr.length -1])
    },
    addBlock(item) {
      let params = {
        contents: [
          {
            count: "",
            des: ""
          }
        ],
        economy: "",
        head: "",
        icon: "",
        path: "",
        price: "",
        subButton:"",
        subPath: "",
        subPrice: "",
        subTitle: "",
        title: "",
        value: "Выбрать",
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
