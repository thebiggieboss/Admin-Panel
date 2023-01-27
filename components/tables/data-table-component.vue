<template>
  <v-card class="mx-auto">
    <v-sheet outlined color="grey">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 white--text text-center">
            {{ dataTable}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "data-table-component",
  props: {
    dataTable: {
      type: '',
      default: () => '',
    },
  },
};
</script>

<style scoped></style>
