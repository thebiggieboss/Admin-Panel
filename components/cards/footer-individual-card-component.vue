<template>
  <v-card class="mx-auto">
    <v-card-title>
      <v-textarea
        rows="1"
        label="Услуг"
        v-model="cardData.title"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
    </v-card-title>
    <v-card-text>
      <image-dialog-component v-model="cardData.icon"/>
      <v-textarea
        rows="1"
        label="Описание"
        v-model="cardData.description"
        type="text"
        :rules="validateInputs.text"
      >
      </v-textarea>
      <v-textarea
        rows="1"
        label="Ссылка"
        v-model="cardData.path"
        type="text"
        :rules="validateInputs.text"
      >
      </v-textarea>
    </v-card-text>
  </v-card>
</template>

<script>
import ImageDialogComponent from "@/components/dialogs/image-dialog-component.vue";

export default {
  name: "footer-individual-card-component",
  components: {ImageDialogComponent},
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>

</style>
