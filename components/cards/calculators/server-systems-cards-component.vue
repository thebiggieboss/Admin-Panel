<template>
  <v-row>
    <v-col cols="12">
      <v-textarea
        rows="1"
        label="Название"
        v-model="cardData.title"
        required
        counter
      ></v-textarea>
    </v-col>
    <v-col v-for="(el, elIndex) in cardData.content" :key="elIndex" cols="4">
      <v-sheet class="v-sheet--box">
        <div class="d-flex justify-end">
          <delete-card-component
            :card-data="'Удаление пункта'"
            @change="arrDeleter(cardData.content, elIndex)"
          />
        </div>
        <v-textarea
          rows="1"
          label="Название"
          v-model="el.title"
          required
          counter
        ></v-textarea>
        <v-text-field
          rows="1"
          type="number"
          label="Цена"
          v-model="el.price"
          :rules="validateInputs.price"
          required
          counter
        ></v-text-field>
      </v-sheet>
    </v-col>
    <v-col cols="12">
      <add-new-card-component
        :card-data="0"
        @change="addService(cardData.content)"
      />
    </v-col>
  </v-row>
</template>

<script>
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";

export default {
  name: "server-systems-cards-component",
  components: {AddNewCardComponent, DeleteCardComponent},
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    addService(item) {
      let params = {
        title: '',
        price: ''
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
