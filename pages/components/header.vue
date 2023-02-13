<template>
  <div>
    <change-header-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeHeaderComponent from "@/components/blocks/change-header-component.vue";
import dataMixin from "@/modules/dataMixin";
export default {
  name: "headerChange",
  components: {ChangeHeaderComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
