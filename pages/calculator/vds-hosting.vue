<template>
  <div>
    <vds-hosting-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import VdsHostingCalcComponent from "@/components/blocks/calculators/vds-hosting-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "vds-hosting",
  mixins: [dataMixin],
  components: {VdsHostingCalcComponent},
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
