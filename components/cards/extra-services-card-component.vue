<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <v-col
          v-for="(item, index) in cardData.item[1]"
          :key="index"
          cols="12"
          md="4"
        >
          <v-sheet class="v-sheet--box">
            <v-row class="mb-2">
              <v-col cols="12">
                <delete-card-component
                  v-if="cardData.item[0] !== 'disabled'"
                  :card-data="'Удалить'"
                  @change="$emit('deleteCard', item)"
                />
                  <v-icon
                    v-if="cardData.item[0] === 'disabled'"
                    @click="showCard(item.id)"
                  >
                    mdi-eye-off
                  </v-icon>
                  <v-icon
                    v-else
                    @click="hideCard(item.id)"
                  >
                    mdi-eye
                  </v-icon>
              </v-col>
            </v-row>
            <v-card elevation="0" :disabled="cardData.item[0] === 'disabled'">
              <v-textarea
                rows="1"
                label="Название блока"
                v-model="item.title"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
              <v-textarea
                rows="2"
                label="Описание блока"
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
            </v-card>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <add-new-card-component
            v-if="cardData.item[0] !== 'disabled'"
            :card-data="0"
            @change="$emit('addCard')"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";

export default {
  name: "extra-services-card-component",
  components: {AddNewCardComponent, DeleteCardComponent},
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  methods: {
    showCard(id) {
      this.arrAdder(this.cardData.loc, id)
    },
    hideCard(id) {
      this.arrDeleter(this.cardData.loc, this.cardData.loc.indexOf(id))
    }
  }
}
</script>

<style scoped>

</style>
