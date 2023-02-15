<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="mx-auto">
        <v-card-title>
          Контакты
        </v-card-title>
        <v-card-text v-for="(item, index) in cardData.contacts" :key="index">
          <v-row>
            <v-col cols="10">
              <v-textarea
                rows="1"
                label="Город"
                v-model="item.title"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
            </v-col>
            <v-col cols="2">
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="removeSubBlock(cardData.contacts, index)"/>
              </div>
            </v-col>
          </v-row>
          <v-sheet class="v-sheet--box" v-for="(address, addressIndex) in item.addresses" :key="addressIndex">
            <v-textarea
              rows="1"
              label="Адресс"
              v-model="item.addresses[addressIndex]"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
          </v-sheet>
          <v-sheet class="v-sheet--box">
            <div  v-for="(phone, phoneIndex) in item.phoneNumbers" :key="phoneIndex">
              <div class="d-flex justify-end">
                <delete-card-component :card-data="'Удаление пункта'" @change="removeSubBlock(item.phoneNumbers, phoneIndex)"/>
              </div>
              <v-textarea
                rows="1"
                label="Контакты"
                v-model="item.phoneNumbers[phoneIndex]"
                required
                :rules="validateInputs.phoneRules"
                counter
                type="phone"
              ></v-textarea>
            </div>
            <add-new-card-component :card-data="0" @change="arrAdder(item.phoneNumbers, '')"/>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <add-new-card-component :card-data="0" @change="addContactsCard(cardData.contacts)"/>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>
          О компании
        </v-card-title>
        <v-card-text>
          <image-dialog-component v-model="cardData.foot.logo"/>
          <v-textarea
            rows="1"
            label="Copyright"
            v-model="cardData.foot.copyright"
            required
            :rules="validateInputs.text"
            counter
          ></v-textarea>
          <v-textarea
            rows="1"
            label="Описание"
            v-model="cardData.foot.description"
            required
            counter
          ></v-textarea>
        </v-card-text>
        <v-card-title>
          <v-textarea
            rows="1"
            label="Соц. сеть"
            v-model="cardData.foot.social.title"
            required
            counter
          ></v-textarea>
        </v-card-title>
        <v-card-text>
          <v-sheet class="v-sheet--box" v-for="(el, elIndex) in cardData.foot.social.list" :key="elIndex">
            <div class="d-flex justify-end">
              <delete-card-component :card-data="'Удаление пункта'" @change="removeSubBlock(cardData.foot.social.list, elIndex)"/>
            </div>
            <image-dialog-component v-model="el.icon"/>
            <v-textarea
              rows="1"
              label="Ссылка"
              v-model="el.path"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
            <v-textarea
              rows="1"
              label="Подсказка"
              v-model="el.prompt"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
          </v-sheet>
          <add-new-card-component :card-data="0" @change="addSubBlock(cardData.foot.social.list)"/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import { mask } from 'vue-the-mask'
import ImageDialogComponent from "@/components/dialogs/image-dialog-component.vue";
export default {
  name: "footer-contacts-card-component",
  components: {ImageDialogComponent, AddNewCardComponent, DeleteCardComponent},
  directives: { mask },
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({

  }),
  methods: {
    addContactsCard(item) {
      let params = {
        title: '',
        addresses: [''],
        phoneNumbers: ['']
      }
      this.arrAdder(item, params)
    },
    addSubBlock(item) {
      console.log(item)
      let params = {
        icon: "",
        path: "",
        prompt: ""

      }
      this.arrAdder(item, params)
    },
    removeSubBlock(item, index) {
      this.arrDeleter(item, index)
    },
  }
}
</script>

<style scoped>

</style>
