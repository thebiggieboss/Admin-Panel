<template>
  <div>
    <div v-for="(elem, elemIndex) in cardData.item[1]" :key="elemIndex">
      <div class="py-2">
        <v-icon
          v-if="cardData.item[0] === 'disabled'"
          @click="showCard(elem.id)"
        >
          mdi-eye-off
        </v-icon>
        <v-icon
          v-else
          @click="hideCard(elem.id)"
        >
          mdi-eye
        </v-icon>
      </div>
      <v-card elevation="0" :disabled="cardData.item[0] === 'disabled'">
        <v-sheet class="v-sheet--box">
          <div class="d-flex justify-end">
            <delete-card-component
              :card-data="'Удаление пункта'"
              @change="$emit('deleteCard', elem)"
            />
          </div>
          <v-textarea
            rows="1"
            label="Название"
            v-model="elem.value"
            type="text"
            :rules="validateInputs.text"
          >
          </v-textarea>
          <v-textarea
            rows="1"
            label="Ссылка"
            v-model="elem.path"
            type="text"
            :rules="validateInputs.text"
          >
          </v-textarea>
        </v-sheet>
      </v-card>
    </div>
  </div>
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
  }
};
</script>

<style scoped></style>
