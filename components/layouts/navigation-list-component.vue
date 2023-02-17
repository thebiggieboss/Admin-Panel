<template>
  <div>
    <v-list-group
      v-for="(item, index) in navigationItems[company]"
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
            :src="navigationIcon"
            max-height="22"
            max-width="22"
          >
          </v-img>
        </v-list-item-icon>
        <v-list-item-title>{{ deepItem.title }}</v-list-item-title>
      </v-list-item>
    </v-list-group>
  </div>
</template>

<script>
export default {
  name: "navigation-list-component",
  props: {
    company: {
      type: String,
      default: () => ('')
    }
  },
  data() {
    return {
      navigationIcon: require("~/assets/icons/navigation-icon.svg"),
    }
  },
  computed: {
    navigationItems() {
      return {
        'NLS.KZ': [
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
        ],
        'MEGANET': [
          {
            icon: "mdi-wall",
            title: "Компоненты",
            list: [
              {
                title: "Хедер",
              },
            ],
          },
        ]
      };
    },
  },
}
</script>

<style scoped>

</style>
