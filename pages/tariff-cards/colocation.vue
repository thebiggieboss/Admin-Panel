<template>
  <div>
    <colocation-characteristics-component :data-props="I18n"/>
  </div>
</template>

<script>
import ColocationCharacteristicsComponent from "@/components/blocks/colocation-characteristics-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "colocation",
  components: {ColocationCharacteristicsComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
