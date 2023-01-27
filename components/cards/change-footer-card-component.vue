<template>
  <div>
    <v-card class="mx-auto" v-if="cardData.list">
      <v-card-title>
        <v-textarea
          rows="1"
          label="Услуг"
          v-model="cardData.title"
          required
          :rules="validateInputs.blockTitle"
          counter
        ></v-textarea>
      </v-card-title>
      <v-card-text>
        <v-sheet
          class="v-sheet--box"
          v-for="(elem, elemIndex) in cardData.list"
          :key="elemIndex"
        >
          <div class="d-flex justify-end">
            <delete-card-component
              :card-data="'Удаление пункта'"
              @change="removeSubService(cardData, elemIndex)"
            />
          </div>
          <v-textarea
            rows="1"
            label="Название"
            v-model="elem.value"
            type="text"
            :rules="validateInputs.blockTitle"
          >
          </v-textarea>
          <v-textarea
            rows="1"
            label="Ссылка"
            v-model="elem.path"
            type="text"
            :rules="validateInputs.blockPath"
          >
          </v-textarea>
        </v-sheet>
      </v-card-text>
      <v-card-actions>
        <add-new-card-component
          :card-data="0"
          @change="addSubService(cardData)"
        />
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" v-else>
      <v-card-title>
        <v-textarea
          rows="1"
          label="Услуг"
          v-model="cardData.title"
          required
          :rules="validateInputs.blockTitle"
          counter
        ></v-textarea>
      </v-card-title>
      <v-card-text>
        <v-textarea
          rows="1"
          label="Иконка"
          v-model="cardData.icon"
          type="text"
          :rules="validateInputs.blockIcon"
        >
        </v-textarea>
        <v-textarea
          rows="1"
          label="Описание"
          v-model="cardData.description"
          type="text"
          :rules="validateInputs.blockTitle"
        >
        </v-textarea>
        <v-textarea
          rows="1"
          label="Ссылка"
          v-model="cardData.path"
          type="text"
          :rules="validateInputs.blockPath"
        >
        </v-textarea>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";

export default {
  name: "change-footer-card-component",
  components: {DeleteCardComponent, AddNewCardComponent},
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
    removeSubService(item, index) {
      return item.list.splice(index, 1);
    },
    addSubService(item) {
      let params = {
        value: "",
        path: "",
      };
      return item.list.push(params);
    },
  }
}
</script>

<style scoped>

</style>
