<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="footerItems.key">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col
            v-for="(item, index) in footerItems.navigation"
            :key="index"
            cols="12"
            lg="3"
            class="pa-6"
          >
          <change-footer-card-component :card-data="item"/>
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

export default {
  name: "change-footer-component",
  components: {
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
    footerItems() {
      return this.dataI18n[this.$store.state.lang.selectLang].footer;
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
  },

};
</script>

<style lang="scss"></style>
