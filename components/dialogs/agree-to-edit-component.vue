<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="$emit('close')"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="submit"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "agree-to-edit-component",
  props: {
    mainData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: true
    }
  },
  methods: {
    async submit() {
      await this.PostI18n(this.mainData)
      this.$emit('close')
    }
  },
}
</script>

<style scoped>

</style>
