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
  components: {ColocationCalcComponent}
}
</script>

<style scoped>

</style>
