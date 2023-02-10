<template>
  <div class="pb-16 pt-16">
    <select-city-component :city-list="dataI18n" />
    <v-card>
      <v-tabs v-model="tab" background-color="primary" dark centered grow>
        <v-tab
          v-for="(item, index) in Object.entries(footerServices)"
          :key="index"
        >
          {{ item[0] }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-6">
        <v-form ref="form" @submit.prevent="submit">
          <v-tab-item
            v-for="(item, index) in Object.entries(footerServices)"
            :key="index"
          >
            <v-row>
              <v-col cols="12">
                <v-card class="mx-auto">
                  <v-card-title>
                    <v-textarea
                      rows="1"
                      label="Название"
                      v-model="footerItems.navigation.services.title"
                      type="text"
                      :rules="validateInputs.blockTitle"
                    >
                    </v-textarea>
                  </v-card-title>
                  <v-card-text>
                    <footer-services-card-component
                      :card-data="{ item, loc: location }"
                      @deleteCard="deleteCard"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <add-new-card-component
                      v-if="item[0] !== 'disabled'"
                      :card-data="0"
                      @change="addCard"
                    />
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-if="item[0] === 'active'">
              <v-col lg="4" cols="12">
                <change-footer-card-component
                  :card-data="footerItems.navigation.store"
                />
              </v-col>
              <v-col lg="4" cols="12">
                <change-footer-card-component
                  :card-data="footerItems.navigation.legalEntities"
                />
              </v-col>
              <v-col lg="4" cols="12">
                <footer-individual-card-component
                  :card-data="footerItems.navigation.individuals"
                />
              </v-col>
              <footer-contacts-card-component :card-data="footerItems" />
            </v-row>
          </v-tab-item>
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
      default: () => ({}),
    },
  },
  data() {
    return {
      tab: null,
      dialogEdit: false,
      dataI18n: this.dataProps,
    };
  },
  computed: {
    location() {
      let city =
        this.dataI18n[this.$store.state.lang.selectLang].selectCity.list;
      return city.find((item) => item.id === this.$store.state.lang.location);
    },
    footerItems() {
      return this.dataI18n[this.$store.state.lang.selectLang].footer;
    },
    footerServices() {
      return {
        active: this.footerItems.navigation.services.list.filter((item) =>
          this.location.footerServicesList.some((el) => el === item.id)
        ),
        disabled: this.footerItems.navigation.services.list.filter(
          (item) =>
            !this.location.footerServicesList.some((el) => el === item.id)
        ),
      };
    },
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
      let footerList = this.footerItems.navigation.services.list;
      let id = footerList[footerList.length - 1].id;
      let params = {
        id: ++id,
        path: "",
        value: "",
      };
      this.arrAdder(footerList, params);
      this.location.footerServicesList.push(id);
    },
    deleteCard(elem) {
      let cities =
        this.dataI18n[this.$store.state.lang.selectLang].selectCity.list;
      cities.map((item) =>
        item.footerServicesList.filter((id) => {
          if (id === elem.id) {
            return item.footerServicesList.splice(
              item.footerServicesList.indexOf(elem.id),
              1
            );
          }
        })
      );
      this.arrDeleter(
        this.footerItems.navigation.services.list,
        this.footerItems.navigation.services.list.indexOf(elem)
      );
    },
  },
};
</script>

<style lang="scss"></style>
