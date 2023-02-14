<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="radioBridge.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col>
                <v-textarea
                  rows="1"
                  label="Заголовок"
                  v-model="radioBridge.title"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
                <v-textarea
                  rows="1"
                  label="Под заголовок"
                  v-model="radioBridge.des"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-sheet class="v-sheet--box">
              <div v-for="(item, index) in radioBridge.list">
                <v-textarea
                  rows="1"
                  label="Описание"
                  v-model="radioBridge.list[index]"
                  required
                  :rules="validateInputs.text"
                  counter
                ></v-textarea>
              </div>
            </v-sheet>
            <v-textarea
              rows="1"
              label="Под описание"
              v-model="radioBridge.subDes"
              required
              :rules="validateInputs.text"
              counter
            ></v-textarea>
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
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "construct-radio-bridge-component",
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
    radioBridge() {
      return this.dataProps[this.$store.state.lang.selectLang].constructRadioBridge
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
