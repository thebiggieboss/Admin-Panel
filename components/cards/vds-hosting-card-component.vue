<template>
  <v-card>
    <slot></slot>
    <v-card-title>
      <v-textarea
        rows="1"
        label="Заголовок"
        v-model="cardData.head"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
      <v-textarea
        rows="1"
        label="Тариф"
        v-model="cardData.title"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
      <v-textarea
        rows="1"
        label="Под заголовок"
        v-model="cardData.subTitle"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
    </v-card-title>
    <v-card-text>
      <v-sheet class="v-sheet--box" v-for="(list, listIndex) in cardData.contents" :key="listIndex">
        <div class="d-flex justify-end">
          <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(cardData.contents, listIndex)"/>
        </div>
        <v-textarea
          rows="1"
          label="Количество"
          v-model="list.count"
          required
          :rules="validateInputs.text"
          counter
        ></v-textarea>
        <v-textarea
          rows="1"
          label="Описание"
          v-model="list.des"
          required
          :rules="validateInputs.text"
          counter
        ></v-textarea>
      </v-sheet>
      <add-new-card-component :card-data="0" @change="addCard(cardData.contents)"/>
    </v-card-text>
    <v-card-text>
      <v-textarea
        rows="1"
        label="Экономия"
        v-model="cardData.economy"
        required
        counter
      ></v-textarea>
      <v-textarea
        rows="1"
        label="price"
        v-model="cardData.price"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
<!--      <image-dialog-component v-model="cardData.icon"/>-->
      <v-textarea
        rows="1"
        label="price"
        v-model="cardData.subPrice"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>

<script>
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import ImageDialogComponent from "@/components/dialogs/image-dialog-component.vue";

export default {
  name: "vds-hosting-card-component",
  components: {ImageDialogComponent, AddNewCardComponent, DeleteCardComponent},
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    addCard(item) {
      let params = {
        count: '',
        des: ''
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
