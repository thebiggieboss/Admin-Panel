<template>
  <v-row>
    <v-col cols="12" v-for="(item, index) in cardData" :key="index" md="6" lg="3">
      <v-container>
        <v-card>
          <v-img
            :src="item.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="copyPath(item)"
            >
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="arrDeleter(cardData, index)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "media-card-component",
  props: ['cardData'],
  data() {
    return {

    }
  },
  methods: {
    copyPath(item) {
      const input = document.createElement('textarea')
      input.value = item.src
      input.setAttribute('readonly', item.src);
      document.body.appendChild(input)
      input.select();
      document.execCommand('copy');
    }
  }
}
</script>

<style scoped lang="scss">

</style>
