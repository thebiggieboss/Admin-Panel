<template>
  <div>
    <internet-club-component :data-props="I18n"/>
    <how-we-work-component :data-props="I18n"/>
  </div>
</template>

<script>
import internetClubComponent from "@/components/blocks/block-inet/internet-club-component.vue";
import HowWeWorkComponent from "@/components/blocks/block-inet/how-we-work-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "internet-club",
  components: {HowWeWorkComponent, internetClubComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
