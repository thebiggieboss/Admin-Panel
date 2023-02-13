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
      <v-textarea
        rows="1"
        label="Иконка"
        v-model="cardData.icon"
        type="text"
        :rules="validateInputs.text"
      >
      </v-textarea>
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
export default {
  name: "footer-individual-card-component",
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
