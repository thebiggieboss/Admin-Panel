<template>
  <div>
    <public-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import PublicCalcComponent from "@/components/blocks/calculators/public-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "public",
  mixins: [dataMixin],
  components: {PublicCalcComponent}
}
</script>

<style scoped>

</style>
