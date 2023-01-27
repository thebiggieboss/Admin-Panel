<template>
  <div>
    <internet-component />
    <how-we-work-component />
    <internet-cards-component :card-data="`internetList`"/>
  </div>
</template>

<script>
import internetComponent from "@/components/blocks/block-inet/internet-component.vue";
import HowWeWorkComponent from "@/components/blocks/block-inet/how-we-work-component.vue";
import InternetCardsComponent from "@/components/blocks/block-inet/internet-cards-component.vue";

export default {
  name: "internet",
  components: {InternetCardsComponent, HowWeWorkComponent, internetComponent}
}
</script>

<style scoped>

</style>
