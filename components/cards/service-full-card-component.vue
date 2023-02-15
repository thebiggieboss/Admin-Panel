<template>
  <v-row>
<!--    <v-col cols="12">-->
<!--      <v-icon-->
<!--        v-if="!cardData.block.show"-->
<!--        @click="showCard(cardData.block.id)"-->
<!--      >-->
<!--        mdi-eye-off-->
<!--      </v-icon>-->
<!--      <v-icon-->
<!--        v-if="cardData.block.show"-->
<!--        @click="hideCard(cardData.block.id)"-->
<!--      >-->
<!--        mdi-eye-->
<!--      </v-icon>-->
<!--    </v-col>-->
    <v-col cols="12">
      <v-card elevation="2">
        <v-sheet class="v-sheet--box">
          <v-card-title>
            <v-textarea
              rows="1"
              label="Название блока"
              v-model="cardData.title"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
          </v-card-title>
          <v-card-text>
            <v-textarea
              rows="1"
              label="Описание блока"
              v-model="cardData.des"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <image-dialog-component v-model="cardData.icon"/>
            <v-textarea
              rows="1"
              label="Ссылка "
              v-model="cardData.path"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Кнопка"
              v-model="cardData.pathName"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
          </v-card-text>
        </v-sheet>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ImageDialogComponent from "@/components/dialogs/image-dialog-component.vue";

export default {
  name: "service-full-card-component",
  components: {ImageDialogComponent},
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  // methods: {
  //   showCard(id) {
  //     let arr = this.cardData.loc.find(item => item.id === this.cardData.item.id)
  //     this.arrAdder(arr.child, id)
  //     arr.child.sort((a, b) => a - b)
  //   },
  //   hideCard(id) {
  //     let arr = this.cardData.loc.find(item => item.id === this.cardData.item.id)
  //     this.arrDeleter(arr.child, arr.child.indexOf(id))
  //   }
  // }
}
</script>

<style scoped>

</style>
