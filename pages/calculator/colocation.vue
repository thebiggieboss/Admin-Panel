<template>
  <div>
    <colocation-calc-component :data-props="I18n" />
  </div>
</template>

<script>
import ColocationCalcComponent from "@/components/blocks/calculators/colocation-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "colocation",
  mixins: [dataMixin],
  components: {ColocationCalcComponent},
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
