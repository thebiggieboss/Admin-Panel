<template>
  <v-tooltip right>
    <template v-slot:activator="{ on, attrs }">
      <v-img
        v-bind="attrs"
        v-on="on"
        :max-width="tooltipData[cardData].size"
        :max-height="tooltipData[cardData].size"
        :src="tooltipData[cardData].icon"
        @click="$emit('change')"
      >
      </v-img>
    </template>
    <span>{{tooltipData[cardData].title}}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "add-new-card-component",
  props: {
    cardData: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      tooltipData: [
        { title: 'Добавление нового пункта', icon: require('~/assets/icons/add-block.svg'), size: 30 },
        { title: 'Добавление нового блока', icon: require('~/assets/icons/add-block2.svg'), size: 50 },
      ]
    }
  },
}
</script>

<style scoped>

</style>
