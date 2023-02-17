<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
    >
      <div class="d-flex flex-column justify-space-between fill-height" style="gap: 32px">
        <div>
          <v-list-item class="justify-center">
            <v-list-item-avatar width="96" height="96">
              <v-img :src="images.adminIcon"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-center">
              <v-list-item-title class="text-h6"> Big Brother </v-list-item-title>
            </v-list-item-content>
            <v-btn icon @click="logout">
              <v-img :src="images.exitIcon" max-height="28" max-width="28"></v-img>
            </v-btn>
          </v-list-item>
          <v-list-item router :to="'/'">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="'Dashboard'"> </v-list-item-title>
          </v-list-item>
          <navigation-list-component :company="currentComp"/>
          <v-list-item router :to="'/news'">
            <v-list-item-icon>
              <v-icon>mdi-newspaper</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="'Новости'"> </v-list-item-title>
          </v-list-item>
          <v-list-item router :to="'/media'">
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="'Картинки'"> </v-list-item-title>
          </v-list-item>
        </div>
        <version-component />
      </div>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-select
        v-model="currentComp"
        :items="company"
        hide-details
        class="default__lang-select"
      ></v-select>
      <v-spacer />
      <v-select
        v-model="selectLang"
        :items="lang"
        menu-props="auto"
        label="Select"
        hide-details
        prepend-icon="mdi-map"
        single-line
        class="default__lang-select"
        color="light-blue darken-3"
        item-color="light-blue darken-3"
      ></v-select>
    </v-app-bar>
    <v-main class="default__main">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getI18n } from "@/service/user";
import { mapActions } from "vuex";
import dataMixin from "@/modules/dataMixin";
import VersionComponent from "@/components/elements/version-component.vue";
import NavigationListComponent from "@/components/layouts/navigation-list-component.vue";

export default {
  name: "DefaultLayout",
  components: {NavigationListComponent, VersionComponent},
  mixins: [dataMixin],
  data() {
    return {
      company: ['NLS.KZ','MEGANET'],
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      images: {
        adminIcon: require("~/assets/icons/admin.jpg"),
        exitIcon: require("~/assets/icons/exit.svg"),
        settingsIcon: require("~/assets/icons/settings.svg"),
      },
      currentComp: this.$store.state.user.company,
      selectLang: this.$store.state.lang.selectLang,
      lang: [],
      navigation: [],
    };
  },
  watch: {
    selectLang(e) {
      this.$store.commit("lang/setSelectLang", e);
      this.$cookies.set("selectLang", e);
    },
    currentComp(e) {
      this.$store.commit("user/setCompany", e);
      this.$cookies.set("company", e);
    }
  },
  methods: {
    ...mapActions({
      getLocation: "lang/getLocation",
    }),
    async GetI18nDefault() {
      try {
        const res = await getI18n()
        this.lang = Object.keys(res.data.data.content)

      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: e.success ? "success" : "error",
        });
      }
    },
    logout() {
      this.$store.dispatch("user/logout");
    },
  },
  async mounted() {
    await this.GetI18nDefault()
    await Promise.all([this.getLocation()]);
  },
};
</script>
<style lang="scss" scoped>
.default__lang-select {
  max-width: 120px;
}

@media screen and (max-width: 960px) {
  .default__main {
    display: none;
  }
}
</style>
