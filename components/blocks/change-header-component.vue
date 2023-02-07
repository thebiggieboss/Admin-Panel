<template>
  <div class="pt-16 pb-16">
    <select-city-component :city-list="dataI18n" />
    <data-table-component :data-table="headerMenu.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col
            v-for="(item, index) in headerNavigation"
            :key="index"
            cols="12"
            class="pa-6"
            lg="6"
          >
            <v-card elevation="0">
              <v-card-actions>
                <v-icon
                  v-if="!item.show"
                  @click="showCard(item.id)"
                >
                  mdi-eye-off
                </v-icon>
                <v-icon
                  v-if="item.show"
                  @click="hideCard(item.id)"
                >
                  mdi-eye
                </v-icon>
              </v-card-actions>
            </v-card>
            <change-header-card-component :card-data="{item: item, index: index}" @removeMenu="removeService(item.id, index)" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center" style="gap: 32px">
              <v-btn type="submit">
                Сохранить
              </v-btn>
              <v-btn @click="GetI18n">
                Вернуть данные
              </v-btn>
              <add-new-card-component :card-data="1" @change="addService"/>
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
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import ChangeHeaderCardComponent from "@/components/cards/change-header-card-component.vue";
import SelectCityComponent from "@/components/blocks/select-city-component.vue";


export default {
  name: "change-header-component",
  components: {
    SelectCityComponent,
    ChangeHeaderCardComponent, AddNewCardComponent, DataTableComponent, AgreeToEditComponent },
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogEdit: false,
      blockObj: {},
      dataI18n: this.dataProps
    };
  },
  computed: {
    location() {
      let city = this.dataI18n[this.$store.state.lang.selectLang].selectCity.list;
      return city.find((item) => item.id === this.$store.state.lang.location);
    },
    headerMenu() {
      return this.dataI18n[this.$store.state.lang.selectLang].header;
    },
    headerNavigation() {
      return this.headerMenu.menuList.map(item => {
        return {
          ...item,
          show: this.location.headerMenuItems.some((menu) => menu === item.id)
        }
      })
    }
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) {
        this.$toast.open({
          message: "Заполните поля",
          type: "warning",
        });
        return;
      }
      this.dialogEdit = true;
    },
    showCard(id) {
      this.arrAdder(this.location.headerMenuItems, id)
      this.location.headerMenuItems.sort((a, b) => a - b)
    },
    hideCard(id) {
      this.arrDeleter(this.location.headerMenuItems, this.location.headerMenuItems.indexOf(id))
    },
    addService() {
      let id = this.headerMenu.menuList[this.headerMenu.menuList.length - 1].id
      let params = {
        id: ++id,
        icon: "",
        value: "",
        services: [
          {
            title: "",
            des: "",
            type: "",
            path: "",
          },
        ],
      };
      this.arrAdder(this.headerMenu.menuList, params)
      this.showCard(id)
    },
    removeService(id, index) {
      this.arrDeleter(this.headerMenu.menuList, index)
      this.hideCard(id)
    },
  },
};
</script>

<style scoped></style>
