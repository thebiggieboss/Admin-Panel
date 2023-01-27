<template>
  <div>
    <change-about-nls-component />
    <change-about-banner-component />
  </div>
</template>

<script>
import ChangeAboutBannerComponent from "@/components/blocks/about-banner-component.vue";
import ChangeAboutNlsComponent from "@/components/blocks/about-nls-component.vue";

export default {
  name: "about-nls",
  components: {ChangeAboutNlsComponent, ChangeAboutBannerComponent}
}
</script>

<style scoped>

</style>
