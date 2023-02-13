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
          <v-list-group
            v-for="(item, index) in navigationItems"
            :key="index"
            :value="false"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(deepItem, index) in item.list"
              link
              :key="index"
              :to="deepItem.to"
              router
            >
              <v-list-item-icon class="mt-0 mb-0 mr-0 align-self-center">
                <v-img
                  :src="images.navigationIcon"
                  max-height="22"
                  max-width="22"
                >
                </v-img>
              </v-list-item-icon>
              <v-list-item-title>{{ deepItem.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
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
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="miniVariant = !miniVariant"-->
      <!--      >-->
      <!--        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>-->
      <!--      </v-btn>-->
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="fixed = !fixed"-->
      <!--      >-->
      <!--        <v-icon>mdi-minus</v-icon>-->
      <!--      </v-btn>-->
      <v-toolbar-title>{{ title }}</v-toolbar-title>
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

export default {
  name: "DefaultLayout",
  components: {VersionComponent},
  mixins: [dataMixin],
  data() {
    return {
      title: "NLS.KZ",
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      images: {
        adminIcon: require("~/assets/icons/admin.jpg"),
        exitIcon: require("~/assets/icons/exit.svg"),
        settingsIcon: require("~/assets/icons/settings.svg"),
        navigationIcon: require("~/assets/icons/navigation-icon.svg"),
      },
      selectLang: this.$store.state.lang.selectLang,
      lang: [],
      navigation: [],
    };
  },
  watch: {
    selectLang(e) {
      this.$store.commit("lang/setSelectLang", e);
      this.$cookies.set("selectLang", e);
    }
  },
  computed: {
    navigationItems() {
      return [
        {
          icon: "mdi-wall",
          title: "Компоненты",
          list: [
            {
              title: "Хедер",
              to: "/components/header",
            },
            {
              title: "Футер",
              to: "/components/footer",
            },
            {
              title: "Услуги",
              to: "/components/main-services",
            },
            {
              title: "Вакансии",
              to: "/components/vacancies",
            },
            {
              title: "О компании",
              to: "/components/about-nls",
            },
            {
              title: "Почему выбирают нас",
              to: "/components/why-choose",
            },
            {
              title: "Вопросы и ответы",
              to: "/components/faq",
            },
            {
              title: "Еще услуги",
              to: "/components/extra-services",
            },
            {
              title: "Услуги IT-Поддержки",
              to: "/components/it-support",
            },
          ],
        },
        {
          icon: "mdi-access-point-network",
          title: "Интернет",
          list: [
            {
              title: "Интернет для бизнеса",
              to: "/inet/internet",
            },
            {
              title: "WiFi для гостей",
              to: "/inet/wifi",
            },
            {
              title: "Интернет по радиоканалу",
              to: "/inet/radio",
            },
            {
              title: "Интернет в комп клуб",
              to: "/inet/internet-club",
            },
          ],
        },
        {
          icon: "mdi-calculator",
          title: "Калькуляторы",
          list: [
            {
              title: "IT Поддержка",
              to: "/calculator/itspec",
            },
            {
              title: "VDS/VPS",
              to: "/calculator/vds-hosting",
            },
            {
              title: "Публичное облоко",
              to: "/calculator/public",
            },
            {
              title: "Частное облоко",
              to: "/calculator/private",
            },
            {
              title: "Облачное хранилище",
              to: "/calculator/cloud",
            },
            {
              title: "Обьект S3",
              to: "/calculator/cloud-s3",
            },
            {
              title: "Аренда серверов",
              to: "/calculator/dedicated",
            },
            {
              title: "ЦОД",
              to: "/calculator/colocation",
            },
          ],
        },
        {
          icon: "mdi-cards-outline",
          title: "Тариф карточки",
          list: [
            {
              title: "Облачная инфраструктура",
              to: "/tariff-cards/server",
            },
            {
              title: "Хостинг",
              to: "/tariff-cards/hosting",
            },
            {
              title: "VDS/VPS",
              to: "/tariff-cards/vds-hosting",
            },
            {
              title: "Аренда серверов",
              to: "/tariff-cards/dedicated",
            },
            {
              title: "ЦОД",
              to: "/tariff-cards/colocation",
            },
          ],
        },
      ];
    },
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
  max-width: 90px;
}

@media screen and (max-width: 960px) {
  .default__main {
    display: none;
  }
}
</style>
