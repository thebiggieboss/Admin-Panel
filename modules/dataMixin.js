import axios from "axios";

export default {
  data() {
    return {
    }
},
  async asyncData({app, store}) {
    const BaseUrl = process.env.BASE_URL;
    const {data} = await axios.get(`${BaseUrl}/api/v1/i18-content/get-locale`, {
      params: {
        version: store.state.lang.version
      }
    })
    return {
      I18n: data.data.content,
    }
  },
}
