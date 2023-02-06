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
  components: {DedicatedCalcComponent}
}
</script>

<style scoped>

</style>
