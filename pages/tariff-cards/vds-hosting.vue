<template>
  <div>
    <vds-hosting-cards-block-component :data-props="I18n"/>
  </div>
</template>

<script>
import VdsHostingCardsBlockComponent from "@/components/blocks/tariff/vds-hosting-cards-block-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "vds-hosting",
  components: {VdsHostingCardsBlockComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
