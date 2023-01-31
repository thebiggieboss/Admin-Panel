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
}
</script>

<style scoped>

</style>
