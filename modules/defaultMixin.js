import {getI18n, postI18n} from "@/service/user";
export default {
  computed: {
    validateInputs() {
      return {
        text: [
          (v) => !!v || "заполните поле",
        ],
        price: [v => (!isNaN(parseFloat(v)) && v >= 0) || 'Заполните поле'],
        phoneRules: [
          (v) => !!v.length || 'Заполните поле',
        ],
      }
    },
  },
  methods: {
    arrDeleter(block, blockIndex) {
      return block.splice(blockIndex, 1)
    },
    arrAdder(block, params) {
      return block.push(params)
    },
    // async GetI18n() {
    //   const version = this.$store.state.lang.version
    //   try {
    //     const res = await getI18n(version);
    //   } catch (e) {
    //     this.$toast.open({
    //       message: e.message,
    //       type: e.success ? "success" : "error",
    //     });
    //   }
    // },
    async PostI18n(data) {
      try {
        const res = await postI18n(data)
        this.$store.commit('lang/setVersion', res.data)
        this.$toast.open({
          message: res.message,
          type: res.success ? "success" : "error",
        });
      }catch (e) {
        this.$toast.open({
          message: e.message,
          type: e.success ? "success" : "error",
        });
      }
    }
  },
}
