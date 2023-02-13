<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="colcationChar.title">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <v-card v-for="(item, index) in colcationChar.cards" :key="index" class="my-4">
              <v-card-title>
                <v-row>
                  <v-col cols="12">
                    <div class="d-flex justify-end">
                      <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(colcationChar.cards, index)"/>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      rows="1"
                      label="Заголовок"
                      v-model="item.title"
                      required
                      :rules="validateInputs.text"
                      counter
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12">
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
                <v-row>
                  <v-col v-for="(list, listIndex) in item.list" :key="listIndex" cols="12" md="4">
                    <v-sheet class="v-sheet--box">
                      <div class="d-flex justify-end">
                        <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(item.list, listIndex)"/>
                      </div>
                      <v-textarea
                        rows="1"
                        label="Описание"
                        v-model="item.list[listIndex]"
                        required
                        :rules="validateInputs.text"
                        counter
                      ></v-textarea>
                    </v-sheet>
                  </v-col>
                  <v-col cols="12">
                    <add-new-card-component :card-data="0" @change="arrAdder(item.list, '')"/>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <add-new-card-component :card-data="1" @change="addBlock(colcationChar.cards)"/>
          </v-col>
          <v-col cols="12">
            <div class="d-flex align-center" style="gap: 32px">
              <v-btn type="submit">
                Сохранить
              </v-btn>
              <v-btn @click="GetI18n">
                Вернуть данные
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </data-table-component>
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataProps"
    />
  </div>
</template>

<script>
import DataTableComponent from "@/components/tables/data-table-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "colocation-characteristics-component",
  components: {AgreeToEditComponent, AddNewCardComponent, DeleteCardComponent, DataTableComponent},
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogEdit: false,
    };
  },
  computed: {
    colcationChar() {
      return this.dataProps[this.$store.state.lang.selectLang].characteristicDataCenter
    }
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return;
      }
      this.dialogEdit = true;
    },
    addBlock(item) {
      let params = {
        icon: "",
        list: [''],
        title: ""
      }
      this.arrAdder(item, params)
    }
  }
}
</script>

<style scoped>

</style>
