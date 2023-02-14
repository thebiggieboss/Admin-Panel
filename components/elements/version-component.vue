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
            v-for="(item, index) in versionList.slice(0, 10)"
            :key="index"
            color="primary"
            :class="{'v-list-item--active': $store.state.lang.version === item}"
            @click="versionControl(item)"
          >
            <v-list-item-title v-html="item"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>
  </div>
</template>

<script>
import {getI18n} from "@/service/user";

export default {
  name: "version-component",
  data: () => {
    return {
      versions: undefined,
      versionsList: [],
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
    async GetI18n() {
      const version = this.$store.state.lang.version
      try {
        const res = await getI18n(version);
        this.versionsList = res.data.data.versions
      } catch (e) {
        this.$toast.open({
          message: e.message,
          type: e.success ? "success" : "error",
        });
      }
    },
  },
  async mounted() {
    await this.GetI18n()
  }
}
</script>

<style scoped>

</style>
