<template>
  <div class="pb-16 pt-16">
    <select-city-component :city-list="dataI18n"/>
    <data-table-component :data-table="mainService.key">
      <v-form ref="form" @submit.prevent="submit">
        <div  v-for="(item, index) in mainServicesBlocks" :key="index">
          <v-row>
            <v-col v-for="(block, blockIndex) in item.list" :key="block.id" cols="12" :md="item.type === 'grid-4' ? 6 : 4">
              <service-card-component v-if="block.list" :card-data="block"/>
              <service-full-card-component v-else :card-data="block"/>
            </v-col>
          </v-row>
        </div>
        <v-row>
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
import DataTableComponent from "@/components/tables/data-table-component.vue";
import SelectCityComponent from "@/components/blocks/select-city-component.vue";
import ServiceCardComponent from "@/components/cards/service-card-component.vue";
import ServiceFullCardComponent from "@/components/cards/service-full-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "main-services-component",
  components: {
    AgreeToEditComponent,
    ServiceFullCardComponent, ServiceCardComponent, SelectCityComponent, DataTableComponent },
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
      let city = this.dataI18n[this.$store.state.lang.selectLang].selectCity.list
      return city.find(item => item.id === this.$store.state.lang.location)
    },
    mainService() {
      return this.dataI18n[this.$store.state.lang.selectLang].mainServices;
    },
    mainServicesBlocks() {
      return this.location.mainServices.map((service) => {
        const block = this.mainService.blocks.find((block) => block.id === service.id);
        return {
          ...block,
          list: block.list.filter((item) => service.child.some((ch) => ch === item.id)),
        };
      });
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

<style scoped lang="scss"></style>
