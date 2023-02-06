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
  components: {PrivateCalcComponent}
}
</script>

<style scoped>

</style>
