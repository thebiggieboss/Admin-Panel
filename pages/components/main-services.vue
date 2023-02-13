<template>
  <div>
    <change-main-services-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeMainServicesComponent from "@/components/blocks/main-services-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "main-services",
  components: {ChangeMainServicesComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
