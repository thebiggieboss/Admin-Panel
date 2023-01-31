<template>
  <div>
    <internet-component :data-props="I18n"/>
    <how-we-work-component :data-props="I18n"/>
    <internet-cards-component :card-data="`internetList`" :data-props="I18n"/>
  </div>
</template>

<script>
import internetComponent from "@/components/blocks/block-inet/internet-component.vue";
import HowWeWorkComponent from "@/components/blocks/block-inet/how-we-work-component.vue";
import InternetCardsComponent from "@/components/blocks/block-inet/internet-cards-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "internet",
  components: {InternetCardsComponent, HowWeWorkComponent, internetComponent},
  mixins: [dataMixin],
}
</script>

<style scoped>

</style>
