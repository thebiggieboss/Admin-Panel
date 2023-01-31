<template>
  <div>
    <vds-hosting-cards-block-component :data-props="I18n"/>
  </div>
</template>

<script>
import VdsHostingCardsBlockComponent from "@/components/blocks/tariff/vds-hosting-cards-block-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "vds-hosting",
  components: {VdsHostingCardsBlockComponent},
  mixins: [dataMixin],
}
</script>

<style scoped>

</style>
