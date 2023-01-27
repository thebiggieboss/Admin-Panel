<template>
  <div class="pt-16 pb-16">
    <data-table-component :data-table="inetWiFi.key" v-if="dataI18n">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-sheet class="v-sheet--box">
                <v-card-title>
                  <v-textarea
                    rows="1"
                    label="Главный титул"
                    v-model="inetWiFi.title"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                </v-card-title>
                <v-card-text>
                  <v-textarea
                    rows="1"
                    label="Заголовок"
                    v-model="inetWiFi.des"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Описание"
                    v-model="inetWiFi.subDes"
                    required
                    :rules="validateInputs.blockTitle"
                    counter
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    label="Под описание"
                    v-model="inetWiFi.longDes"
                    required
                    :rules="validateInputs.blockTitle"
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
                  <div v-for="(item, index) in inetWiFi.list" :key="index">
                    <v-textarea
                      rows="1"
                      label="Описание"
                      v-model="inetWiFi.list[index]"
                      required
                      :rules="validateInputs.blockTitle"
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
      :main-data="dataI18n"
    />
  </div>
</template>

<script>
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import DataTableComponent from "@/components/tables/data-table-component.vue";

export default {
  name: "internet-wifi-component",
  components: {DataTableComponent, AgreeToEditComponent},
  data() {
    return {
      dialogEdit: false
    }
  },
  async fetch() {
    await this.GetI18n()
  },
  computed: {
    inetWiFi() {
      return this.dataI18n[this.$store.state.lang.selectLang].internetPublicWifiHead
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
    }
  }
}
</script>

<style scoped>

</style>
