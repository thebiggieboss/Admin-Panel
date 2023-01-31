<template>
  <div class="pt-16 pb-16">
    <data-table-component :data-table="headerMenu.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col
            v-for="(item, index) in headerMenu.menuList"
            :key="index"
            cols="12"
            class="pa-6"
            lg="6"
          >
            <change-header-card-component :card-data="{item: item, index: index}" @removeMenu="removeService(index)"/>
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


export default {
  name: "change-header-component",
  components: {
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
    headerMenu() {
      return this.dataI18n[this.$store.state.lang.selectLang].header;
    },
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
    addService() {
      let params = {
        id: this.headerMenu.menuList[this.headerMenu.menuList.length - 1].id + 1,
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
    },
    removeService(index) {
      this.arrDeleter(this.headerMenu.menuList, index)
    },
  },
};
</script>

<style scoped></style>
