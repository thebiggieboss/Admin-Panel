<template>
  <div>
    <private-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import PrivateCalcComponent from "@/components/blocks/calculators/private-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "private",
  mixins: [dataMixin],
  components: {PrivateCalcComponent},
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
