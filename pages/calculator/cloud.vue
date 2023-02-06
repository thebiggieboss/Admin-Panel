<template>
  <div>
    <cloud-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import CloudCalcComponent from "@/components/blocks/calculators/cloud-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "cloud",
  mixins: [dataMixin],
  components: {CloudCalcComponent}
}
</script>

<style scoped>

</style>
