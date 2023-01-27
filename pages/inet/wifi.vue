<template>
  <div>
    <internet-wifi-component />
    <how-we-work-component />
    <internet-cards-component :card-data="`wifiList`"/>
  </div>
</template>

<script>
import HowWeWorkComponent from "@/components/blocks/block-inet/how-we-work-component.vue";
import InternetCardsComponent from "@/components/blocks/block-inet/internet-cards-component.vue";
import InternetWifiComponent from "@/components/blocks/block-inet/internet-wifi-component.vue";

export default {
  name: "wifi",
  components: {InternetWifiComponent, InternetCardsComponent, HowWeWorkComponent, }
}
</script>

<style scoped>

</style>
