<template>
  <div>
    <internet-radio-channel-component :data-props="I18n"/>
    <how-we-work-radio-component :data-props="I18n"/>
    <internet-cards-component :card-data="`radioBridgeList`" :data-props="I18n"/>
    <construct-radio-bridge-component :data-props="I18n"/>
  </div>
</template>

<script>
import InternetRadioChannelComponent from "@/components/blocks/block-inet/internet-radio-channel-component.vue";
import InternetCardsComponent from "@/components/blocks/block-inet/internet-cards-component.vue";
import HowWeWorkRadioComponent from "@/components/blocks/block-inet/how-we-work-radio-component.vue";
import ConstructRadioBridgeComponent from "@/components/blocks/block-inet/construct-radio-bridge-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "radio",
  components: {
    ConstructRadioBridgeComponent,
    HowWeWorkRadioComponent, InternetCardsComponent, InternetRadioChannelComponent},
  mixins: [dataMixin],
}
</script>

<style scoped>

</style>
