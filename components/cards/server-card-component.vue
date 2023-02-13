<template>
  <v-row>
    <v-col v-for="(item, index) in cardData" cols="12" lg="4" :key="index" >
      <v-card>
        <v-card-title>
         <v-row>
           <v-col cols="12" md="6">
             <v-textarea
               rows="1"
               label="Название"
               v-model="item.title"
               required
               :rules="validateInputs.text"
               counter
             ></v-textarea>
           </v-col>
           <v-col cols="12" md="6">
             <v-textarea
               rows="1"
               label="Иконка"
               v-model="item.icon"
               required
               :rules="validateInputs.text"
               counter
             ></v-textarea>
           </v-col>
         </v-row>
        </v-card-title>
        <v-card-text>
          <v-textarea
            rows="2"
            label="Описание"
            v-model="item.des"
            required
            :rules="validateInputs.text"
            counter
          ></v-textarea>
          <v-textarea
            rows="1"
            label="Ссылка"
            v-model="item.path"
            required
            :rules="validateInputs.text"
            counter
          ></v-textarea>
          <v-textarea
            rows="1"
            label="Конопка"
            v-model="item.value"
            required
            :rules="validateInputs.text"
            counter
          ></v-textarea>
        </v-card-text>
        <v-card-text v-if="!!item['list-content'].length" >
            <v-sheet class="v-sheet--box" v-for="(list, listIndex) in item['list-content']" :key="listIndex">
              <v-textarea
                rows="1"
                label="List"
                v-model="item['list-content'][listIndex]"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
            </v-sheet>
          </v-card-text>
        <v-card-text v-if="!!item['price-content'].length" >
          <v-sheet class="v-sheet--box" v-for="(price, priceIndex) in item['price-content']" :key="priceIndex">
            <v-textarea
              rows="1"
              label="List"
              v-model="price.fromPrice"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="List"
              v-model="price.price"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="List"
              v-model="price.icon"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="List"
              v-model="price.subPrice"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "server-card-component",
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
