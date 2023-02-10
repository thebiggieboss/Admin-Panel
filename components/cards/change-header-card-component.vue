<template>
  <v-row>
    <v-col v-for="(item, index) in cardData.item[1]" :key="index" cols="12" lg="6" class="pa-6">
      <div class="pb-2">
        <v-icon
          v-if="cardData.item[0] === 'disabled'"
          @click="showCard(item.id)"
        >
          mdi-eye-off
        </v-icon>
        <v-icon
          v-else
          @click="hideCard(item.id)"
        >
          mdi-eye
        </v-icon>
      </div>
      <v-card class="mx-auto" :disabled="cardData.item[0] === 'disabled'">
          <v-card-title>
            <v-row>
              <v-col cols="10">
                {{ item.value }}
              </v-col>
              <v-col cols="2" class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление услуг'" @change="$emit('removeMenu', item)"/>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-sheet class="v-sheet--box">
              <v-row class="px-3">
                <v-col cols="12" sm="6">
                  <v-textarea
                    rows="1"
                    label="Услуг"
                    v-model="item.value"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-textarea
                    rows="1"
                    label="Иконка"
                    v-model="item.icon"
                    required
                    :rules="validateInputs.blockIcon"
                    counter
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-title class="text-subtitle-1 ml-4">
            Пункты
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  mdi-comment-question-outline
                </v-icon>
              </template>
              <span> Под пункты </span>
            </v-tooltip>
          </v-card-title>
          <v-card-text>
            <v-row class="px-6">
              <v-col
                cols="12"
                v-for="(el, elIndex) in item.services"
                :key="elIndex"
                md="6"
              >
                <v-sheet class="v-sheet--box">
                  <div class="d-flex justify-end">
                    <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(item.services, elIndex)"/>
                  </div>
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="el.title"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="el.des"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                  <div>
                    <v-textarea
                      v-if="el.path.path"
                      rows="1"
                      label="Ссылка"
                      v-model="el.path.path"
                      required
                      counter
                    ></v-textarea>
                    <v-textarea
                      v-else
                      rows="1"
                      label="Ссылка"
                      v-model="el.path"
                      required
                      counter
                    ></v-textarea>
                  </div>
                  <v-row>
                    <v-col cols="6">
                      <v-textarea
                        rows="1"
                        label="Верхний блок"
                        v-model="el.subDes"
                        counter
                      ></v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        label="Цвет"
                        v-model="el.type"
                        :items="servicesType"
                        counter
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <add-new-card-component :card-data="0" @change="addSubMenu(item.services)"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";

export default {
  name: "change-header-card-component",
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {AddNewCardComponent, DeleteCardComponent },
  data: () => ({
    servicesType: ["service--primary", "service--in-progress"],
  }),

  methods: {
    showCard(id) {
      this.arrAdder(this.cardData.loc, id)
    },
    hideCard(id) {
      this.arrDeleter(this.cardData.loc, this.cardData.loc.indexOf(id))
    },
    addSubMenu(item) {
      let params = {
        title: "",
        des: "",
        type: "",
        path: "",
      };
      this.arrAdder(item, params)
    },
  }
};
</script>

<style scoped></style>
