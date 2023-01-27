<template>
  <v-row v-if="dataI18n">
    <v-col cols="2">
      <v-select
        v-model="select"
        label="Города"
        :items="selectCity"
        item-text="value"
        item-value="id"
        dense
        solo
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "select-city-component",
  data() {
    return {
      select: 1
    }
  },
  async fetch() {
    await this.GetI18n()
  },
  watch: {
    select(id) {
      this.$store.commit('lang/setLocation', id)
      // this.$cookies.set("location", id)
    }
  },
}
</script>

<style scoped>

</style>
