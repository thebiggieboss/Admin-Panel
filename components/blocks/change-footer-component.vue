<template>
  <div class="pb-16 pt-16">
    <select-city-component :city-list="dataI18n" />
    <data-table-component :data-table="footerItems.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col
            lg="3"
            cols="12"
          >
            <footer-services-card-component :card-data="{footerServices, loc: location, obj: footerItems.navigation.services}"/>
          </v-col>
          <v-col
            lg="3"
            cols="12"
          >
          <change-footer-card-component :card-data="footerItems.navigation.store"/>
          </v-col>
          <v-col
            lg="3"
            cols="12"
          >
            <change-footer-card-component :card-data="footerItems.navigation.legalEntities"/>
          </v-col>
          <v-col
            lg="3"
            cols="12"
          >
          <footer-individual-card-component :card-data="footerItems.navigation.individuals"/>
          </v-col>
        </v-row>
        <footer-contacts-card-component :card-data="footerItems"/>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center" style="gap: 32px">
              <v-btn type="submit"> Сохранить </v-btn>
              <v-btn @click="GetI18n"> Вернуть данные </v-btn>
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
import DataTableComponent from "@/components/tables/data-table-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";
import AddNewCardComponent from "@/components/cards/add-new-card-component.vue";
import DeleteCardComponent from "@/components/cards/delete-card-component.vue";
import ChangeFooterCardComponent from "@/components/cards/change-footer-card-component.vue";
import FooterContactsCardComponent from "@/components/cards/footer-contacts-card-component.vue";
import SelectCityComponent from "@/components/blocks/select-city-component.vue";
import FooterIndividualCardComponent from "@/components/cards/footer-individual-card-component.vue";
import FooterServicesCardComponent from "@/components/cards/footer-services-card-component.vue";

export default {
  name: "change-footer-component",
  components: {
    FooterServicesCardComponent,
    FooterIndividualCardComponent,
    SelectCityComponent,
    FooterContactsCardComponent,
    ChangeFooterCardComponent,
    DeleteCardComponent,
    AddNewCardComponent,
    AgreeToEditComponent,
    DataTableComponent,
  },
  props: {
    dataProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogEdit: false,
      dataI18n: this.dataProps
    };
  },
  computed: {
    location() {
      let city = this.dataI18n[this.$store.state.lang.selectLang].selectCity.list;
      return city.find((item) => item.id === this.$store.state.lang.location);
    },
    footerItems() {
      return this.dataI18n[this.$store.state.lang.selectLang].footer;
    },
    footerServices() {
      return this.footerItems.navigation.services.list.map(item => {
        return {
          ...item,
          show: this.location.footerServicesList.some(el => el === item.id)
        }
      })
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
  },

};
</script>

<style lang="scss"></style>
