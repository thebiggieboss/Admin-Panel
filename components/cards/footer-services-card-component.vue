<template>
  <v-card class="mx-auto">
    <v-card-title>
      <v-textarea
        rows="1"
        label="Услуг"
        v-model="cardData.obj.title"
        required
        :rules="validateInputs.blockTitle"
        counter
      ></v-textarea>
    </v-card-title>
    <v-card-text>
      <div v-for="(elem, elemIndex) in cardData.footerServices" :key="elemIndex">
        <div class="py-2">
          <v-icon
            v-if="!elem.show"
            @click="showCard(elem.id)"
          >
            mdi-eye-off
          </v-icon>
          <v-icon
            v-if="elem.show"
            @click="hideCard(elem.id)"
          >
            mdi-eye
          </v-icon>
        </div>
        <v-card elevation="0" :disabled="!elem.show">
          <v-sheet class="v-sheet--box">
            <div class="d-flex justify-end">
              <delete-card-component
                :card-data="'Удаление пункта'"
                @change="removeService(elem.id, elemIndex)"
              />
            </div>
            <v-textarea
              rows="1"
              label="Название"
              v-model="elem.value"
              type="text"
              :rules="validateInputs.blockTitle"
            >
            </v-textarea>
            <v-textarea
              rows="1"
              label="Ссылка"
              v-model="elem.path"
              type="text"
              :rules="validateInputs.blockPath"
            >
            </v-textarea>
          </v-sheet>
        </v-card>
      </div>
    </v-card-text>
    <v-card-actions>
      <add-new-card-component
        :card-data="0"
        @change="addService(cardData)"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";

export default {
  name: "footer-services-card-component",
  components: { DeleteCardComponent, AddNewCardComponent },
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    showCard(id) {
      this.arrAdder(this.cardData.loc.footerServicesList, id)
      this.cardData.loc.footerServicesList.sort((a, b) => a - b)
    },
    hideCard(id) {
      this.arrDeleter(this.cardData.loc.footerServicesList, this.cardData.loc.footerServicesList.indexOf(id))
    },
    removeService(id, index) {
      this.arrDeleter(this.cardData.obj.list, index)
      this.hideCard(id)
    },
    addService() {
      let id = this.cardData.footerServices[this.cardData.footerServices.length - 1].id
      let params = {
        id: ++id,
        path: "",
        value: ""
      }
      this.arrAdder(this.cardData.obj.list, params)
      this.showCard(id)
    }
  }
};
</script>

<style scoped></style>
