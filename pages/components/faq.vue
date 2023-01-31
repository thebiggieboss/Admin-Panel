<template>
  <div>
    <change-faq-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeFaqComponent from "@/components/blocks/faq-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "faq",
  mixins: [dataMixin],
  components: {ChangeFaqComponent},
}
</script>

<style scoped>

</style>
