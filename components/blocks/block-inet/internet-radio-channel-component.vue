<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="inetRadio.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-sheet class="v-sheet--box">
                <v-card-title>
                  <v-textarea
                    rows="1"
                    label="Главный титул"
                    v-model="inetRadio.head"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                </v-card-title>
                <v-card-text>
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="inetRadio.title"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="inetRadio.des"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Под описание"
                    v-model="inetRadio.subDes"
                    required
                    :rules="validateInputs.text"
                    counter
                  ></v-textarea>
                </v-card-text>
              </v-sheet>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-sheet class="v-sheet--box">
                <v-card-text>
                  <div v-for="(item, index) in inetRadio['services-list']" :key="index">
                    <v-textarea
                      rows="1"
                      label="Описание"
                      v-model="inetRadio['services-list'][index]"
                      required
                      :rules="validateInputs.text"
                      counter
                    ></v-textarea>
                  </div>
                </v-card-text>
              </v-sheet>
            </v-card>
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
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "internet-radio-channel-component",
  components: {AgreeToEditComponent, DataTableComponent},
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
    inetRadio() {
      return this.dataProps[this.$store.state.lang.selectLang].radioChannelHead
    }
  },
  methods: {
    submit() {

    }
  }
}
</script>

<style scoped>

</style>
