<template>
  <v-container>
    <v-card>
      <v-img
        :src="imgPath"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
      </v-img>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="copyPath"
        >
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="$emit('delete', cardData.id)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {GetImageUrl} from "@/modules/images";
export default {
  name: "media-card-component",
  props: {
    cardData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  computed: {
    imgPath() {
      return GetImageUrl(this.cardData['key_name'])
    }
  },
  methods: {
    copyPath() {
      const input = document.createElement('textarea')
      input.value = this.imgPath
      input.setAttribute('readonly', this.imgPath);
      document.body.appendChild(input)
      input.select();
      document.execCommand('copy');
    },
  },
}
</script>

<style scoped lang="scss">

</style>
