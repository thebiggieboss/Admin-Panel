<template>
  <div>
    <internet-wifi-component :data-props="I18n"/>
    <how-we-work-component :data-props="I18n"/>
    <internet-cards-component :card-data="`wifiList`" :data-props="I18n"/>
  </div>
</template>

<script>
import HowWeWorkComponent from "@/components/blocks/block-inet/how-we-work-component.vue";
import InternetCardsComponent from "@/components/blocks/block-inet/internet-cards-component.vue";
import InternetWifiComponent from "@/components/blocks/block-inet/internet-wifi-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "wifi",
  components: {InternetWifiComponent, InternetCardsComponent, HowWeWorkComponent, },
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
