<template>
  <div>
    <change-vacancies-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeVacanciesComponent from "@/components/blocks/vacancies-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "vacancies",
  components: {ChangeVacanciesComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
