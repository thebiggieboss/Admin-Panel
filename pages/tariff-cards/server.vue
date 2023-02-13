<template>
  <div>
    <server-cards-block-component :data-props="I18n"/>
  </div>
</template>

<script>
import ServerCardsBlockComponent from "@/components/blocks/tariff/server-cards-block-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "server",
  components: {ServerCardsBlockComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
