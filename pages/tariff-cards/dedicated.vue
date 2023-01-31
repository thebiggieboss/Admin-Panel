<template>
  <div>
    <dedicated-cards-block-component :data-props="I18n"/>
  </div>
</template>

<script>
import DedicatedCardsBlockComponent from "@/components/blocks/tariff/dedicated-cards-block-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "dedicated",
  components: {DedicatedCardsBlockComponent},
  mixins: [dataMixin],
}
</script>

<style scoped>

</style>
