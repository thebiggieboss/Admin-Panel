<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Предупреждение
        </v-card-title>
        <v-card-text>
          Вы собираетесь сохранить внесенные изменения
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!loadingDialog"
            color="green darken-1"
            text
            @click="$emit('close')"
          >
            Отменить
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="submit"
            :disabled="loadingDialog"
            :loading="loadingDialog"
          >
            Сохранить
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
      dialog: true,
      loadingDialog: false
    }
  },
  methods: {
    async submit() {
      this.loadingDialog = true
      await this.PostI18n(this.mainData).finally(() => this.loadingDialog = false)
      this.$emit('close')
    }
  },
}
</script>

<style scoped>

</style>
