<template>
  <v-row>
    <v-col v-for="(item, index) in cardData" :key="index" cols="4">
      <v-sheet class="v-sheet--box">
        <v-row>
          <v-col cols="12">
            <v-textarea
              rows="2"
              label="Заголовок"
              v-model="item.title"
              required
              counter
              hide-details
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-textarea
              rows="1"
              label="Название"
              v-model="item.name"
              required
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Единица измерения"
              v-model="item.des"
              required
              counter
            ></v-textarea>
          </v-col>
          <v-col cols="6">
            <v-text-field
              rows="1"
              type="number"
              label="Цена"
              v-model="item.monthPrice"
              :rules="validateInputs.price"
              required
              counter
            ></v-text-field>
            <v-textarea
              rows="1"
              label="Value"
              v-model="item.value"
              required
              counter
            ></v-textarea>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "calculator-cards-component",
  props: {
    cardData: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>

</style>
