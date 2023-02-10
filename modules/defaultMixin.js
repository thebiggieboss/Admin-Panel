import {getI18n, postI18n} from "@/service/user";
export default {
  // data() {
  //   return {
  //     dataI18n: undefined
  //   }
  // },
  computed: {
    validateInputs() {
      return {
        blockTitle: [
          (v) => !!v || "заполните поле",
          (v) => (!!v && v.length > 3) || 'некоректная',
          v => (v || '' ).length <= 600 || 'Description must be 100 characters or less'
        ],
        blockIcon: [
          (v) => !!v || "заполните поле",
          // (v) => (!!v && v === (`${v}.${'svg' || 'png' || 'jpeg'}`)) || 'некоректная'
          v => (v || '' ).length <= 700 || 'Description must be 100 characters or les',
        ],
        blockPath: [
          (v) => !!v || "заполните поле",
          (v) => (v || '' ).length <= 700 || 'Description must be 100 characters or les',
        ],
        phoneRules: [
          (v) => !!v.length || 'Заполните поле',
          (v) => (v && v.length === 16) || 'Неверный номер',
        ],
        longerText: [
          (v) => !!v || "заполните поле",
        ],
        lessText: [
          (v) => !!v || "заполните поле",
        ]
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
    async GetI18n(version) {
      try {
        const res = await getI18n(version);
        this.dataI18n = res.data.content;
      } catch (e) {
        this.$toast.open({
          message: e.message,
          type: e.success ? "success" : "error",
        });
      }
    },
    async PostI18n(data) {
      try {
        const res = await postI18n(data)
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
