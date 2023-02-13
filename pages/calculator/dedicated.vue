<template>
  <div>
    <dedicated-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import DedicatedCalcComponent from "@/components/blocks/calculators/dedicated-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "dedicated",
  mixins: [dataMixin],
  components: {DedicatedCalcComponent},
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
