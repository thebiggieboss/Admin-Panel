<template>
  <div>
    <hosting-cards-block-component :data-props="I18n"/>
  </div>
</template>

<script>
import HostingCardsBlockComponent from "@/components/blocks/tariff/hosting-cards-block-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "hosting",
  components: {HostingCardsBlockComponent},
  mixins: [dataMixin],
}
</script>

<style scoped>

</style>
