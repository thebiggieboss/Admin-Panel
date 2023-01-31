import axios from "axios";

export default {
  data() {
    return {
    }
},
  async asyncData({app}) {
    const {data} = await axios.get('http://192.168.9.88:3000/api/v1/getLocale')
    return {
      I18n: data,
    }
  },
}
