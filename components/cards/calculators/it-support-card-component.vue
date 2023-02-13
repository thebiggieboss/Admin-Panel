<template>
  <div>
    <v-textarea
      rows="1"
      label="Заголовок"
      v-model="cardData.title"
      required
      :rules="validateInputs.text"
      counter
    ></v-textarea>
    <v-textarea
      rows="1"
      label="Описание"
      v-model="cardData.des"
      required
      :rules="validateInputs.text"
      counter
    ></v-textarea>
    <v-sheet class="v-sheet--box">
      <v-textarea
        rows="1"
        label="Switch"
        v-model="cardData.amountWorkPlaces.title"
        required
        :rules="validateInputs.text"
        counter
      ></v-textarea>
      <div class="pb-4">
        <div
          v-for="item in cardData.amountWorkPlaces.content"
          :key="item.title"
          class="it-support-card-component__switch"
        >
          <v-textarea
            label="Количество"
            rows="1"
            v-model="item.title"
            required
            counter
          ></v-textarea>
          <v-textarea
            label="в месяц"
            rows="1"
            v-model="item.oneMonth"
            required
            counter
          ></v-textarea>
          <v-textarea
            label="Разовая оплата"
            rows="1"
            v-model="item.oneTimePayment"
            required
            counter
          ></v-textarea>
        </div>
      </div>
    </v-sheet>
    <v-sheet class="v-sheet--box">
      <v-textarea
        rows="1"
        label="Select"
        v-model="cardData.selectTitle"
        required
        counter
      ></v-textarea>
      <v-textarea
        rows="1"
        label="Подсказка"
        v-model="cardData.prompt"
        required
        counter
      ></v-textarea>
      <div class="it-support-card-component__select">
        <div v-for="(item, index) in cardData.selects" :key="index">
          <v-textarea
            label="Content"
            rows="1"
            v-model="cardData.selects[index]"
            required
            counter
          ></v-textarea>
        </div>
      </div>
    </v-sheet>
    <v-sheet class="v-sheet--box">
      <v-textarea
        rows="1"
        label="Switch"
        v-model="cardData.services.title"
        required
        counter
      ></v-textarea>
      <div class="it-support-card-component__switch">
        <div v-for="(item, index) in cardData.services.des" :key="index">
          <v-textarea
            label="Сервисы"
            rows="1"
            v-model="cardData.services.des[index]"
            required
            counter
          ></v-textarea>
        </div>
      </div>
    </v-sheet>
    <v-textarea
      rows="1"
      v-model="cardData.priceTitle"
      required
      counter
    ></v-textarea>
    <v-textarea
      rows="1"
      v-model="cardData.subPrice"
      required
      counter
    ></v-textarea>
    <v-textarea
      rows="1"
      v-model="cardData.auditTitle"
      required
      counter
    ></v-textarea>
    <v-textarea
      rows="1"
      v-model="cardData.subAudit"
      required
      counter
    ></v-textarea>
    <v-textarea
      rows="1"
      v-model="cardData.vatDes"
      required
      counter
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: "it-support-card-component",
  props: {
    cardData: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="scss">
.it-support-card-component__switch {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0 16px;
}
.it-support-card-component__select {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0 16px 16px 16px;
}
</style>
