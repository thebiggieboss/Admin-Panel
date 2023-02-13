<template>
  <div>
    <it-support-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import ItSupportCalcComponent from "@/components/blocks/calculators/it-support-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "itspec",
  mixins:[dataMixin],
  components: {ItSupportCalcComponent},
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
