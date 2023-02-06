<template>
  <div>
    <cloud-s3-calc-component :data-props="I18n"/>
  </div>
</template>

<script>
import CloudS3CalcComponent from "@/components/blocks/calculators/cloud-s3-calc-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "cloud-s3",
  mixins: [dataMixin],
  components: {CloudS3CalcComponent}
}
</script>

<style scoped>

</style>
