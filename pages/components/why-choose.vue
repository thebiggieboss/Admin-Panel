<template>
  <div>
    <change-choose-us-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeChooseUsComponent from "@/components/blocks/choose-us-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "why-choose",
  components: {ChangeChooseUsComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
