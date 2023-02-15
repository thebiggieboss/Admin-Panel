<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-row>
        <v-col cols="10">
          <v-text-field
            :value="modelValue"
            readonly
            label="Картинка/Иконка"
            :rules="validateInputs.text"
          >
          </v-text-field>
        </v-col>
        <v-col class="align-self-center" cols="2">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>mdi-image</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card>
      <v-tabs
        v-model="currentTab"
        align-with-title
        background-color="primary"
        dark
        centered
        grow
      >
        <v-card-actions>
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab
          v-for="(item, index) in tabs"
          :key="index"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item
          v-for="(item, index) in tabs"
          :key="index"
        >
          <v-row>
            <v-col cols="12" v-for="(el, elIndex) in contentTab" :key="elIndex" md="6" lg="3">
              <v-container>
                <v-card @click="copyPath(el['key_name'])">
                  <v-img
                    :src="el['key_name']"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    contain
                  >
                  </v-img>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>

import {GetGroupImage, GetImageByGroup} from "@/service/user";
import MediaCardComponent from "@/components/cards/media-card-component.vue";
import {GetImageUrl} from "@/modules/images";

export default {
  name: "image-dialog-component",
  components: {MediaCardComponent},
  props: ['modelValue'],
  model: {
    prop: 'modelValue',
    event: 'modelValueChange'
  },
  data() {
    return {
      dialog: false,
      icon: this.input,
      currentTab: null,
      tabs: [],
      contentTab: [],
    }
  },
  watch: {
    async currentTab(e) {
      let groupName = this.tabs[e].name
      await this.getImageByGroup(groupName)
    }
  },
  methods: {
    async getGroupImage() {
      try {
        const res = await GetGroupImage()
        this.tabs = res.data
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    },
    async getImageByGroup(e) {
      try {
        const data = await GetImageByGroup(e)
        this.contentTab = data.map(item => {
          return {
            ...item,
            key_name: GetImageUrl(item['key_name'])
          }
        })
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: "error"
        })
      }
    },
    copyPath(img) {
      this.$emit('modelValueChange', img)
      this.dialog = false
    },
  },
  async mounted() {
    await this.getGroupImage()
  }
}
</script>

<style scoped lang="scss">
.media-component__input {
  width: 100%;
  max-width: 500px;
}
</style>
