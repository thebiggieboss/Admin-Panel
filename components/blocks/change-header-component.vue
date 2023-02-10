<template>
  <div class="pt-16 pb-16">
    <select-city-component :city-list="dataI18n" />
    <v-card>
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
            <change-header-card-component :card-data="{item, loc: location}" @removeMenu="removeMenu"/>
          </v-tab-item>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center" style="gap: 32px">
                  <v-btn type="submit">
                    Сохранить
                  </v-btn>
                  <v-btn @click="GetI18n">
                    Вернуть данные
                  </v-btn>
                  <add-new-card-component :card-data="1" @change="addMenu"/>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-tabs-items>
    </v-card>
    <agree-to-edit-component
      v-if="!!dialogEdit"
      @close="dialogEdit = false"
      :main-data="dataI18n"
    />
  </div>
</template>

<script>
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import ChangeHeaderCardComponent from "@/components/cards/change-header-card-component.vue";
import SelectCityComponent from "@/components/blocks/select-city-component.vue";


export default {
  name: "change-header-component",
  components: {
    SelectCityComponent,
    ChangeHeaderCardComponent, AddNewCardComponent, AgreeToEditComponent },
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tab: null,
      dialogEdit: false,
      dataI18n: this.dataProps
    };
  },
  computed: {
    location() {
      let city = this.dataI18n[this.$store.state.lang.selectLang].selectCity.list;
      return city.find((item) => item.id === this.$store.state.lang.location).headerMenuItems.sort((a, b) => a - b);
    },
    headerMenuList() {
      return this.dataI18n[this.$store.state.lang.selectLang].header.menuList;
    },
    allList() {
      return {
        active: this.headerMenuList.filter(item => this.location.some((menu) => menu === item.id)),
        disabled: this.headerMenuList.filter(item => !this.location.some((menu) => menu === item.id))
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
    addMenu() {
      let id = this.headerMenuList[this.headerMenuList.length - 1].id
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
      this.arrAdder(this.headerMenuList, params)
      this.location.push(id)
    },
    removeMenu(elem) {
      let cities =  this.dataI18n[this.$store.state.lang.selectLang].selectCity.list
      cities.map(item => item.headerMenuItems.filter(id => {
        if(id === elem.id) {
          return item.headerMenuItems.splice(item.headerMenuItems.indexOf(elem.id), 1)
        }
      }))
      this.arrDeleter(this.headerMenuList, this.headerMenuList.indexOf(elem))
    },
  },
};
</script>

<style scoped></style>
