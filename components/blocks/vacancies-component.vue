<template>
  <div class="pb-16 pt-16">
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
            v-for="(item, itemIndex) in vacanciesCard.tab"
            :key="itemIndex"
          >
            <div class="d-flex justify-space-between align-center">
              <div>
                {{ item.title }}
              </div>
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="removeCity(vacanciesCard.tab, itemIndex)"/>
              </div>
            </div>
          </v-tab>
          <div class="d-flex align-center px-2">
            <add-new-block-card-component :card-data="'Добавление нового города'" @change="addCity(vacanciesCard.tab)"/>
          </div>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(items, itemsIndex) in vacanciesCard.tab"
            :key="itemsIndex"
            class="pa-4"
          >
            <v-textarea
              label="Город"
              style="width: 300px"
              rows="1"
              v-model="items.title"
              required
              :rules="validateInputs.blockTitle"
              counter
            ></v-textarea>
            <v-sheet class="v-sheet--box" v-for="(item, index) in items.cards" :key="index">
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(items.cards, index)"/>
              </div>
              <v-card flat >
                <v-card-title>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-textarea
                        rows="1"
                        label="Название"
                        v-model="item.title"
                        required
                        :rules="validateInputs.blockTitle"
                        counter
                      ></v-textarea>
                      <v-textarea
                        rows="1"
                        label="Заработная плата"
                        v-model="item.salary"
                        required
                        :rules="validateInputs.blockTitle"
                        counter
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div v-for="(content, contentIndex) in item.content" :key="contentIndex">
                        <v-textarea
                          rows="1"
                          label="Занятость"
                          v-model="item.content[contentIndex]"
                          required
                          :rules="validateInputs.blockTitle"
                          counter
                        ></v-textarea>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-row v-for="(des, desIndex) in item.des" :key="desIndex" class="d-flex">
                      <v-col col="11">
                        <v-list-group style="border: 1px solid black;" class="mb-4" :value="desIndex === 0">
                          <template v-slot:activator>
                            <v-list-item-content>
                              <v-list-item-title v-text="des.title"></v-list-item-title>
                            </v-list-item-content>
                          </template>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                <v-textarea
                                  label="Название"
                                  style="width: 300px"
                                  rows="1"
                                  v-model="des.title"
                                  required
                                  :rules="validateInputs.blockTitle"
                                  counter
                                ></v-textarea>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item v-for="(desContent, descIndex) in des.description" :key="descIndex">
                            <v-list-item-content>
                              <v-list-item-title>
                                <v-textarea
                                  rows="1"
                                  :label="des.title"
                                  v-model="des.description[descIndex]"
                                  required
                                  :rules="validateInputs.blockTitle"
                                  counter
                                ></v-textarea>
                              </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                              <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(des.description, descIndex)"/>
                            </v-list-item-icon>
                          </v-list-item>
                          <v-list-item-icon>
                            <add-new-card-component :card-data="0" @change="arrAdder(des.description, '')"/>
                          </v-list-item-icon>
                        </v-list-group>
                      </v-col>
                      <v-col cols="1">
                        <div class="d-flex justify-end">
                          <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(item.des, desIndex)"/>
                        </div>
                      </v-col>
                    </v-row>
                    <add-new-card-component :card-data="0" @change="addCard(item.des)"/>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-sheet>
            <add-new-card-component :card-data="1" @change="addBlock(items.cards)"/>
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
      :main-data="dataI18n"
    />
  </div>
</template>

<script>
import DataTableComponent from "@/components/tables/data-table-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import AddNewBlockCardComponent from "@/components/cards/add-new-block-card-component.vue";

export default {
  name: "vacancies-component",
  components: {
    AddNewBlockCardComponent,
    AgreeToEditComponent, AddNewCardComponent, DeleteCardComponent, DataTableComponent},
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
      dataI18n: this.dataProps
    };
  },
  computed: {
    vacanciesCard() {
      return this.dataI18n[this.$store.state.lang.selectLang].vacanciesList
    }
  },
  methods: {
    removeCity(item, index) {
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
        title: '',
        description: ['']
      }
      this.arrAdder(item, params)
    },
    addBlock(item) {
      let id = item[item.length - 1].id
      let params = {
          id: ++id,
          title: '',
          salary: '',
          value: '',
          content: ['', ''],
          des: [
            {
              title: '',
              description: ['']
            }
            ]
      }
      this.arrAdder(item, params)
    },
    addCity(item) {
      let params = {
        title: '',
        cards: [
          {
            id: 1,
            title: '',
            salary: '',
            value: 'Подробнее',
            content: ['', ''],
            des: [
              {
                title: '',
                description: ['']
              }
            ]
          }
        ]
      }
      this.arrAdder(item, params)
      let arr = this.vacanciesCard.tab
      this.tab = arr.indexOf(arr[arr.length -1])
    },
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
  },
}
</script>

<style scoped lang="scss">
</style>
