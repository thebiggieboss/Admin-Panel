<template>
  <div>
    <change-extra-services-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeExtraServicesComponent from "@/components/blocks/extra-services-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "extra-services",
  components: {ChangeExtraServicesComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
