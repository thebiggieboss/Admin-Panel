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
}
</script>

<style scoped>

</style>
