<template>
  <div>
    <v-list-item>
      <v-menu offset-y top v-model="versions">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            block
          >
            Versions
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in versionList.slice(0, 5)"
            :key="index"
            color="primary"
            :class="{'v-list-item--active': $store.state.lang.version === item}"
            @click="versionControl(item)"
          >
            <v-list-item-title v-html="item"></v-list-item-title>
          </v-list-item>
          <span class="d-flex justify-center text-body-2">Еще</span>
        </v-list>
      </v-menu>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: "version-component",
  data: () => {
    return {
      versions: undefined,
      versionsList: []
    }
  },
  watch: {
    async versions(e) {
      if(e) {
        await this.GetI18n()
      }
    }
  },
  computed: {
    versionList() {
      return this.versionsList
    }
  },
  methods: {
    versionControl(e) {
      this.$store.commit('lang/setVersion', e)
      this.$nuxt.$emit('refreshPage')
    },
  },
  async mounted() {
    await this.GetI18n()
  }
}
</script>

<style scoped>

</style>
