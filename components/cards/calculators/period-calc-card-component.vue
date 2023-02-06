<template>
  <v-row class="px-4">
    <v-col cols="12">
      <v-textarea
        rows="1"
        label="Название"
        v-model="cardData.title"
        required
        counter
        hide-details
      ></v-textarea>
    </v-col>
    <v-col
      cols="4"
      v-for="(item, index) in cardData.tabs"
      :key="index"
    >
      <v-sheet class="v-sheet--box">
        <v-textarea
          rows="1"
          label="Период"
          v-model="item.title"
          required
          counter
        ></v-textarea>
        <v-textarea
          rows="1"
          label="Месяц"
          v-model="item.value"
          required
          counter
        ></v-textarea>
        <v-textarea
          rows="1"
          label="Скидка(текст)"
          v-model="item.subText"
          required
          counter
        ></v-textarea>
        <v-textarea
          rows="1"
          label="Скидка"
          v-model="item.discount"
          required
          counter
        ></v-textarea>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "period-calc-card-component",
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
