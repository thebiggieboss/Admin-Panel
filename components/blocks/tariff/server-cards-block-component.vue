<template>
  <div class="pb-16 pt-16">
    <data-table-component :data-table="serverCard.title">
      <v-form ref="form" @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <server-card-component :card-data="serverCard.cards"/>
          </v-col>
         <v-col cols="12">
           <server-additional-card-component :card-data="serverCard['additionally-cards']"/>
         </v-col>
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
import ServerCardComponent from "@/components/cards/server-card-component.vue";
import ServerAdditionalCardComponent from "@/components/cards/server-additional-card-component.vue";
import AgreeToEditComponent from "@/components/dialogs/agree-to-edit-component.vue";

export default {
  name: "server-cards-block-component",
  components: {AgreeToEditComponent, ServerAdditionalCardComponent, ServerCardComponent, DataTableComponent},
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
    serverCard() {
      return this.dataProps[this.$store.state.lang.selectLang].cloudInfrastructure
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
