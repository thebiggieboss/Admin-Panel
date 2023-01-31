<template>
  <div>
   <change-footer-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeFooterComponent from "@/components/blocks/change-footer-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "footerChange",
  components: {ChangeFooterComponent},
  mixins: [dataMixin],
}
</script>

<style scoped>

</style>
