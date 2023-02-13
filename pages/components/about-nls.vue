<template>
  <div>
    <change-about-nls-component :data-props="I18n"/>
    <change-about-banner-component :data-props="I18n"/>
  </div>
</template>

<script>
import ChangeAboutBannerComponent from "@/components/blocks/about-banner-component.vue";
import ChangeAboutNlsComponent from "@/components/blocks/about-nls-component.vue";
import dataMixin from "@/modules/dataMixin";

export default {
  name: "about-nls",
  components: {ChangeAboutNlsComponent, ChangeAboutBannerComponent},
  mixins: [dataMixin],
  created() {
    this.$nuxt.$on('refreshPage', () => this.$nuxt.refresh())
  },
}
</script>

<style scoped>

</style>
