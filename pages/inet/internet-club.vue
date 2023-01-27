<template>
  <div>
    <internet-club-component />
    <how-we-work-component />
  </div>
</template>

<script>
import internetClubComponent from "@/components/blocks/block-inet/internet-club-component.vue";
import HowWeWorkComponent from "@/components/blocks/block-inet/how-we-work-component.vue";

export default {
  name: "internet-club",
  components: {HowWeWorkComponent, internetClubComponent}
}
</script>

<style scoped>

</style>
