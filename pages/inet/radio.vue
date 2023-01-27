<template>
  <div>
    <internet-radio-channel-component />
    <how-we-work-radio-component />
    <internet-cards-component :card-data="`radioBridgeList`"/>
    <construct-radio-bridge-component />
  </div>
</template>

<script>
import InternetRadioChannelComponent from "@/components/blocks/block-inet/internet-radio-channel-component.vue";
import InternetCardsComponent from "@/components/blocks/block-inet/internet-cards-component.vue";
import HowWeWorkRadioComponent from "@/components/blocks/block-inet/how-we-work-radio-component.vue";
import ConstructRadioBridgeComponent from "@/components/blocks/block-inet/construct-radio-bridge-component.vue";

export default {
  name: "radio",
  components: {
    ConstructRadioBridgeComponent,
    HowWeWorkRadioComponent, InternetCardsComponent, InternetRadioChannelComponent}
}
</script>

<style scoped>

</style>
