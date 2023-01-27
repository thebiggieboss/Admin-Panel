import axios from "axios";

function getI18n() {
  return  axios.get('http://192.168.9.88:3000/api/v1/getLocale')
}
function postI18n(data) {
  return axios.post('http://192.168.9.88:3000/api/v1/getLocale', data)
}

export {
  getI18n,
  postI18n
}
