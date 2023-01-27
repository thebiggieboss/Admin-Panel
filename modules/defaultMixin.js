import {getI18n, postI18n} from "@/service";
export default {
  data: () =>  ({
    dataI18n: undefined,
  }),
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
    selectCity() {
      return this.dataI18n ? this.dataI18n[this.$store.state.lang.selectLang].selectCity.list : undefined
    },
    location() {
      return this.selectCity?.find(item => item.id === this.$store.state.lang.location)
    }
  },
  methods: {
    arrDeleter(block, blockIndex) {
      return block.splice(blockIndex, 1)
    },
    arrAdder(block, params) {
      return block.push(params)
    },
    async GetI18n() {
      try {
        const res = await getI18n();
        this.dataI18n = res.data;
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
          message: res.data.message,
          type: res.data.success ? "success" : "error",
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
