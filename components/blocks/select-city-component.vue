<template>
  <v-row>
    <v-col cols="2">
      <v-select
        :value="$store.state.lang.location"
        label="Города"
        :items="listOfCity"
        item-text="value"
        item-value="id"
        dense
        solo
        @input="select"
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "select-city-component",
  props: {
    cityList: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  computed: {
    listOfCity() {
      return this.cityList[this.$store.state.lang.selectLang].selectCity.list
    },
  },
  methods: {
    select(id) {
      this.$store.commit('lang/setLocation', id)
      // this.$cookies.set("location", id)
    }
  }
  // created() {
  //   this.select = this.$store.state.lang.location
  // }
}
</script>

<style scoped>

</style>
