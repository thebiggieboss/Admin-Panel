<template>
  <div>
    <it-out-services-component :data-props="I18n"/>
  </div>
</template>

<script>
import ItOutServicesComponent from "@/components/blocks/it-out-services-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "it-support",
  components: {ItOutServicesComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
