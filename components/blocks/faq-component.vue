<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="faqData.key" >
        <v-form ref="form" @submit.prevent="submit">
          <v-card class="mx-auto">
            <v-card-title>
              <v-textarea
                rows="1"
                label="Заголовок"
                v-model="faqData.title"
                required
                :rules="validateInputs.text"
                counter
              ></v-textarea>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" lg="4" v-for="(item, index) in faqData" :key="index" v-if="!!item.list">
                  <h3 class="pb-4">{{item.title}}</h3>
                  <v-sheet class="v-sheet--box" v-for="(el, elIndex) in item.list" :key="elIndex">
                    <div class="d-flex justify-end">
                      <delete-card-component :card-data="'Удаление пункта'" @change="arrDeleter(item.list, elIndex)"/>
                    </div>
                    <v-textarea
                      rows="1"
                      label="Название"
                      v-model="el.title"
                      required
                      :rules="validateInputs.text"
                      counter
                    ></v-textarea>
                    <v-textarea
                      rows="3"
                      label="Описание"
                      v-model="el.content"
                      required
                      :rules="validateInputs.text"
                      counter
                    ></v-textarea>
                  </v-sheet>
                  <add-new-card-component :card-data="0" @change="addCard(item.list)"/>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center" style="gap: 32px">
                    <v-btn type="submit">
                      Сохранить
                    </v-btn>
                    <v-btn @click="$nuxt.$emit('refreshPage')">
                      Вернуть данные
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
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
  name: "faq-component",
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
    }
  },
  computed: {
    faqData() {
      return this.dataProps[this.$store.state.lang.selectLang].faq
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
    addCard(item) {
      let params = {
        content: '',
        title: ''
      }
      this.arrAdder(item, params)
    }
  },
}
</script>

<style scoped>

</style>
