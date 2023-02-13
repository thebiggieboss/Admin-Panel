<template>
  <div class="pt-16 pb-16">
    <select-city-component :city-list="dataProps" />
    <v-card>
      <v-card-title>
        <v-textarea
          rows="1"
          label="Заголовок"
          v-model="extraServices.title"
          required
          :rules="validateInputs.text"
          counter
          hide-details
        ></v-textarea>
      </v-card-title>
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark
        centered
        grow
      >
        <v-tab
          v-for="(item, index) in Object.entries(allList)"
          :key="index"
        >
          {{ item[0] }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-form ref="form" @submit.prevent="submit">
          <v-tab-item
            v-for="(item, index) in Object.entries(allList)"
            :key="index"
          >
              <v-row>
                <v-col cols="12">
                  <extra-services-card-component :card-data="{item, loc: location}" @addCard="addCard" @deleteCard="deleteCard"/>
                </v-col>
                <v-col cols="12">
                  <v-card-actions>
                    <v-row>
                      <v-col cols="12">
                        <div class="d-flex align-center" style="gap: 32px">
                          <v-btn type="submit"> Сохранить </v-btn>
                          <v-btn @click="GetI18n"> Вернуть данные </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-col>
              </v-row>
          </v-tab-item>
        </v-form>
      </v-tabs-items>
    </v-card>
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
import SelectCityComponent from "@/components/blocks/select-city-component.vue";
import AddDisabledCardComponent from "@/components/cards/add-disabled-card-component.vue";
import ExtraServicesCardComponent from "@/components/cards/extra-services-card-component.vue";

export default {
  name: "extra-services-component",
  components: {
    ExtraServicesCardComponent,
    AddDisabledCardComponent,
    SelectCityComponent,
    AgreeToEditComponent,
    AddNewCardComponent,
    DeleteCardComponent,
    DataTableComponent,
  },
  props: {
    dataProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tab: null,
      dialogEdit: false,
    };
  },
  watch: {
    extraServices(e) {
      console.log(e)
    }
  },
  computed: {
    location() {
      let city = this.dataProps[this.$store.state.lang.selectLang].selectCity.list;
      return city.find((item) => item.id === this.$store.state.lang.location).extraServicesList.sort((a, b) => a - b);
    },
    extraServices() {
      return this.dataProps[this.$store.state.lang.selectLang].extraServicesList
    },
    allList() {
      return {
        active: this.extraServices.list.filter(item => this.location.some((menu) => menu === item.id)),
        disabled: this.extraServices.list.filter(item => !this.location.some((menu) => menu === item.id))
      }
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
    addCard() {
      let id = this.extraServices.list[this.extraServices.list.length -1].id
      let params = {
        id: ++id,
        path: "",
        title: "",
        des: ""
      }
      this.arrAdder(this.extraServices.list, params)
      this.location.push(id)
    },
    deleteCard(elem) {
      let cities =  this.dataProps[this.$store.state.lang.selectLang].selectCity.list
      cities.map(item => item.extraServicesList.filter(id => {
        if(id === elem.id) {
          return item.extraServicesList.splice(item.extraServicesList.indexOf(elem.id), 1)
        }
      }))
      this.arrDeleter(this.extraServices.list, this.extraServices.list.indexOf(elem))
    },
  },
};
</script>

<style scoped></style>
