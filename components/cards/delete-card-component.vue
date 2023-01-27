<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        v-on="on"
        @click="$emit('change')"
      >
        mdi-delete
      </v-icon>
    </template>
    <span>{{cardData}}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "delete-card-component",
  props: {
    cardData: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>

</style>
