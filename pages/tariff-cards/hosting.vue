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
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
